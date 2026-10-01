import { NextResponse } from "next/server";

import { getFestivals } from "@/lib/festivals-data";

export async function GET() {
  try {
    const festivals = await getFestivals();

    return NextResponse.json(festivals);
  } catch (error) {
    console.error("Failed to load festivals:", error);

    return NextResponse.json(
      { error: "Unable to load festivals." },
      { status: 500 }
    );
  }
}