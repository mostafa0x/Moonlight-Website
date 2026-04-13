import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  packageId: z.string(),
  tourDate: z.string(),
  adultsNumber: z.number().min(1),
  kidsNumber: z.number().min(0).optional(),
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
        { error: "FETCH_BOOKINGS_FAILED" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Bookings Error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  console.log("👉 /api/bookings POST route HIT!");
  try {
    const body = await req.json();

    // Basic validation
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "INVALID_BOOKING_DATA", details: validation.error.format() }, { status: 400 });
    }

    console.log("👉 Validated payload:", validation.data);

    const authHeader = req.headers.get("Authorization");
    const idempotencyKey = req.headers.get("x-idempotency-key");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const targetUrl = `${baseUrl}/bookings`;

    console.log("👉 Target URL:", targetUrl);

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {}),
        ...(idempotencyKey ? { "x-idempotency-key": idempotencyKey } : {}),
      },
      body: JSON.stringify(validation.data),
    });

    console.log("👉 Backend Response Status:", response.status);

    if (!response.ok) {
      let backErr;
      try { backErr = await response.json(); } catch(e) {}
      console.error("👉 CREATE_BOOKING_FAILED from Backend:", backErr);
      return NextResponse.json(
        { error: "CREATE_BOOKING_FAILED", details: backErr },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log("👉 Backend Response Data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("POST Booking Error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
}


