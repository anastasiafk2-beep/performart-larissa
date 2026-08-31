import { NextResponse } from "next/server";

import { getGiveaways } from "@/lib/giveaways-data";

export async function GET() {
  const giveaways = await getGiveaways();

  return NextResponse.json(giveaways);
}