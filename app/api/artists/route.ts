import { NextResponse } from "next/server";

import { getArtists } from "@/lib/artists-data";

export async function GET() {
  const artists = await getArtists();

  return NextResponse.json(artists);
}