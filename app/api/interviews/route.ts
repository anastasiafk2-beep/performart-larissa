import { NextResponse } from "next/server";

import { getInterviews } from "@/lib/interviews-data";

export async function GET() {
  const interviews = await getInterviews();

  return NextResponse.json(interviews);
}