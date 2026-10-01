import { NextResponse } from "next/server";

import { getCinemaReviews } from "@/lib/cinema-reviews-data";

export async function GET() {
  try {
    const reviews = await getCinemaReviews();

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to load cinema reviews:", error);

    return NextResponse.json(
      { error: "Unable to load cinema reviews." },
      { status: 500 }
    );
  }
}