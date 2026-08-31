import { NextResponse } from "next/server";

import { getCinemaReviews } from "@/lib/cinema-reviews-data";

export async function GET() {
  const reviews = await getCinemaReviews();

  return NextResponse.json(reviews);
}