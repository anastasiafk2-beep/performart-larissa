import { NextResponse } from "next/server";

import { getArtists } from "@/lib/artists-data";

export async function GET() {
  try {
    const artists = await getArtists();

    return NextResponse.json(artists);
  } catch (error) {
    console.error("Failed to load artists:", error);

    return NextResponse.json(
      { error: "Unable to load artists." },
      { status: 500 }
    );
  }
}