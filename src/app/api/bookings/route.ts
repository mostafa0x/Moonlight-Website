import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  packageId: z.string(),
  tourDate: z.string(),
  participants: z.number().min(1),
  // Add more fields as per your backend requirements
}).passthrough();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const targetUrl = `${baseUrl}/bookings`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {}),
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch bookings" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Bookings Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Basic validation
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid booking data", details: validation.error.format() }, { status: 400 });
    }

    const authHeader = req.headers.get("Authorization");
    const idempotencyKey = req.headers.get("x-idempotency-key");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const targetUrl = `${baseUrl}/bookings`;


    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {}),
        ...(idempotencyKey ? { "x-idempotency-key": idempotencyKey } : {}),
      },
      body: JSON.stringify(validation.data),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("POST Booking Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

