import { NextResponse } from "next/server";

import { getCinemaMovies } from "@/lib/cinema-data";

export async function GET() {
  try {
    const movies = await getCinemaMovies();

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Failed to load cinema movies:", error);

    return NextResponse.json(
      { error: "Unable to load cinema movies." },
      { status: 500 }
    );
  }
}