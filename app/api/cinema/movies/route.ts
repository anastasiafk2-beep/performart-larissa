import { NextResponse } from "next/server";

import { getCinemaMovies } from "@/lib/cinema-data";

export async function GET() {
  const movies = await getCinemaMovies();

  return NextResponse.json(movies);
}
