import { NextResponse } from "next/server";


export async function GET() {
  return NextResponse.json({ message: process.env.NEXT_PUBLIC_RAPIDAPI_KEY });
}