import { NextResponse } from "next/server";

import { getMusic } from "@/lib/music-data";

export async function GET() {
  const music = await getMusic();

  return NextResponse.json(music);
}