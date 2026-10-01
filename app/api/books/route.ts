import { NextResponse } from "next/server";

import { getBooks } from "@/lib/books-data";

export async function GET() {
  try {
    const books = await getBooks();

    return NextResponse.json(books);
  } catch (error) {
    console.error("Failed to load books:", error);

    return NextResponse.json(
      { error: "Unable to load books." },
      { status: 500 }
    );
  }
}