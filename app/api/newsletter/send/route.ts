import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { timingSafeEqual } from "node:crypto";
import { deliverNewsletter } from "@/lib/newsletter/deliver";

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
  const received = request.headers.get('x-newsletter-secret');
  if (!secret || !received || Buffer.byteLength(secret) !== Buffer.byteLength(received) || !timingSafeEqual(Buffer.from(secret), Buffer.from(received)))
    return NextResponse.json({error:'Unauthorized'},{status:401});
  const {KIT_API_KEY, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN} = process.env;
  if (!KIT_API_KEY || !NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET || !SANITY_API_TOKEN)
    return NextResponse.json({error:'Missing server configuration'},{status:500});
  let payload;
  try { payload = await request.json(); } catch { return NextResponse.json({error:'Invalid JSON'},{status:400}); }
  const client = createClient({projectId:NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:NEXT_PUBLIC_SANITY_DATASET,token:SANITY_API_TOKEN,apiVersion:'2025-02-19',useCdn:false});
  try {
    return await deliverNewsletter(payload,client,KIT_API_KEY,(blocks) => portableTextToHtml(blocks as PortableTextBlock[]),process.env.NEWSLETTER_SEND_ENABLED === 'true');
  } catch {
    // Do not leak provider errors or credentials. Durable receipts prevent a second POST.
    return NextResponse.json({error:'Newsletter processing failed; retry safely or inspect the delivery receipt'},{status:503});
  }
}
