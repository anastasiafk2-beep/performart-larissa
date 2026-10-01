import { NextResponse } from "next/server";

import { getEvents } from "@/lib/events-data";

export async function GET() {
  try {
    const events = await getEvents();

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to load events:", error);

    return NextResponse.json(
      { error: "Unable to load events." },
      { status: 500 }
    );
  }
}