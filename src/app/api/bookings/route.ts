import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("Authorization");
    const idempotencyKey = req.headers.get("x-idempotency-key");
    console.log("In Proxy - Authorization Header received:", authHeader ? `${authHeader.substring(0, 20)}...` : "NONE");
    console.log("In Proxy - Idempotency Key received:", idempotencyKey);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/bookings`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(authHeader ? { "Authorization": authHeader } : {}),
          ...(idempotencyKey ? { "x-idempotency-key": idempotencyKey } : {}),
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        errorData || { error: "Failed to create booking" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
