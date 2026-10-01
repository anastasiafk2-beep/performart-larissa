import { NextResponse } from "next/server";

import { getGiveaways } from "@/lib/giveaways-data";

export async function GET() {
  try {
    const giveaways = await getGiveaways();

    return NextResponse.json(giveaways);
  } catch (error) {
    console.error("Failed to load giveaways:", error);

    return NextResponse.json(
      { error: "Unable to load giveaways." },
      { status: 500 }
    );
  }
}