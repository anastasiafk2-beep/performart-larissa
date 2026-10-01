import { NextResponse } from "next/server";

import { getInterviews } from "@/lib/interviews-data";

export async function GET() {
  try {
    const interviews = await getInterviews();

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Failed to load interviews:", error);

    return NextResponse.json(
      { error: "Unable to load interviews." },
      { status: 500 }
    );
  }
}