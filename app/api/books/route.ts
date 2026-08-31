import { NextResponse } from "next/server";

import { getBooks } from "@/lib/books-data";

export async function GET() {
  const books = await getBooks();

  return NextResponse.json(books);
}