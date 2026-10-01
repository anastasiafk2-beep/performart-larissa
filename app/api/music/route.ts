import { NextResponse } from "next/server";

import { getMusic } from "@/lib/music-data";

export async function GET() {
  try {
    const music = await getMusic();

    return NextResponse.json(music);
  } catch (error) {
    console.error("Failed to load music:", error);

    return NextResponse.json(
      { error: "Unable to load music." },
      { status: 500 }
    );
  }
}