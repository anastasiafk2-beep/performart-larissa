import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

export const runtime = "nodejs";

type PortableTextSpan = {
  _type?: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

type MarkDef = {
  _key?: string;
  _type?: string;
  href?: string;
};

type PortableTextBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  children?: PortableTextSpan[];
  markDefs?: MarkDef[];
};

type NewsletterPayload = {
  _id?: string;
  _rev?: string;
  title?: string;
  subject?: string;
  previewText?: string;
  body?: PortableTextBlock[];
  sendStatus?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeHref(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);

    if (
      url.protocol === "http:" ||
      url.protocol === "https:" ||
      url.protocol === "mailto:"
    ) {
      return value;
    }
  } catch {
    return null;
  }

  return null;
}

function renderSpan(
  span: PortableTextSpan,
  markDefs: MarkDef[]
) {
  let text = escapeHtml(span.text || "");

  for (const mark of span.marks || []) {
    if (mark === "strong") {
      text = `<strong>${text}</strong>`;
      continue;
    }

    if (mark === "em") {
      text = `<em>${text}</em>`;
      continue;
    }

    if (mark === "underline") {
      text = `<u>${text}</u>`;
      continue;
    }

    if (mark === "strike-through") {
      text = `<s>${text}</s>`;
      continue;
    }

    const definition = markDefs.find(
      (item) => item._key === mark
    );

    if (definition?._type === "link") {
      const href = safeHref(definition.href);

      if (href) {
        text = `<a href="${escapeHtml(
          href
        )}">${text}</a>`;
      }
    }
  }

  return text;
}

function portableTextToHtml(
  blocks: PortableTextBlock[] = []
) {
  return blocks
    .map((block) => {
      if (block._type !== "block") return "";

      const content = (block.children || [])
        .map((span) =>
          renderSpan(span, block.markDefs || [])
        )
        .join("");

      if (!content.trim()) {
        return "<p>&nbsp;</p>";
      }

      if (block.listItem === "bullet") {
        return `<p>• ${content}</p>`;
      }

      if (block.listItem === "number") {
        return `<p>${content}</p>`;
      }

      switch (block.style) {
        case "h1":
          return `<h1>${content}</h1>`;

        case "h2":
          return `<h2>${content}</h2>`;

        case "h3":
          return `<h3>${content}</h3>`;

        case "blockquote":
          return `<blockquote>${content}</blockquote>`;

        default:
          return `<p>${content}</p>`;
      }
    })
    .join("\n");
}

export async function POST(request: NextRequest) {
  const secret = process.env.NEWSLETTER_WEBHOOK_SECRET;
  const receivedSecret = request.headers.get(
    "x-newsletter-secret"
  );

  if (
    !secret ||
    !receivedSecret ||
    receivedSecret !== secret
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET;
  const sanityToken = process.env.SANITY_API_TOKEN;

  if (
    !apiKey ||
    !projectId ||
    !dataset ||
    !sanityToken
  ) {
    return NextResponse.json(
      { error: "Missing server configuration" },
      { status: 500 }
    );
  }

  let payload: NewsletterPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const {
    _id,
    _rev,
    title,
    subject,
    previewText,
    body,
    sendStatus,
  } = payload;

  if (
    !_id ||
    !_rev ||
    !subject ||
    !Array.isArray(body) ||
    sendStatus !== "ready"
  ) {
    return NextResponse.json(
      { error: "Invalid newsletter payload" },
      { status: 400 }
    );
  }

  const sanityWriteClient = createClient({
    projectId,
    dataset,
    apiVersion: "2026-08-31",
    token: sanityToken,
    useCdn: false,
  });

  /*
   * Κλειδώνουμε το συγκεκριμένο revision.
   * Αν το ίδιο webhook ξανατρέξει, δεν μπορεί
   * να δημιουργήσει δεύτερη αποστολή.
   */
  try {
    await sanityWriteClient
      .patch(_id)
      .ifRevisionId(_rev)
      .set({
        newsletterSending: true,
      })
      .commit();
  } catch {
    return NextResponse.json(
      {
        ok: true,
        skipped: true,
        reason: "Already processing",
      },
      { status: 200 }
    );
  }

  const html = portableTextToHtml(body);
  const now = new Date().toISOString();

  try {
    const kitResponse = await fetch(
      "https://api.kit.com/v4/broadcasts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({
          subject,
          preview_text: previewText || "",
          description:
            title || `Sanity newsletter ${_id}`,
          content: html,

          // Δεν εμφανίζεται δημόσια σαν post στο Kit.
          public: false,

          // Αποστολή τώρα.
          published_at: now,
          send_at: now,
        }),
        cache: "no-store",
      }
    );

    const kitResult = await kitResponse.json();

    if (!kitResponse.ok) {
      const errorMessage =
        Array.isArray(kitResult?.errors)
          ? kitResult.errors.join(" | ")
          : "Kit broadcast creation failed";

      await sanityWriteClient
        .patch(_id)
        .set({
          sendStatus: "draft",
          sendError: errorMessage,
        })
        .unset(["newsletterSending"])
        .commit();

      return NextResponse.json(
        {
          error: errorMessage,
        },
        { status: 502 }
      );
    }

    const broadcastId =
      kitResult?.broadcast?.id ?? null;

    await sanityWriteClient
      .patch(_id)
      .set({
        sendStatus: "sent",
        sentAt: now,
        kitBroadcastId: broadcastId,
      })
      .unset([
        "newsletterSending",
        "sendError",
      ])
      .commit();

    return NextResponse.json({
      ok: true,
      broadcastId,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    await sanityWriteClient
      .patch(_id)
      .set({
        sendStatus: "draft",
        sendError: message,
      })
      .unset(["newsletterSending"])
      .commit();

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}