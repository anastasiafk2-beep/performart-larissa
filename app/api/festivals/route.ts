import { NextResponse } from "next/server";

import { getFestivals } from "@/lib/festivals-data";

export async function GET() {
  const festivals = await getFestivals();

  return NextResponse.json(festivals);
}