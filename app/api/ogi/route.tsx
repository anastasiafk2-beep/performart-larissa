import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const logoUrl = new URL("/logos/logo-white.png", request.url);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logoUrl.toString()}
          width="700"
          height="250"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}