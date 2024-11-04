import { NextRequest, NextResponse } from "next/server";

import { credentialOfferData, credentialOfferTypes } from "../credentials";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { did, email, type } = body;

    // Validate required fields
    if (!did || !email || !type) {
      return NextResponse.json(
        {
          error: "Missing required fields: did, email and type",
        },
        { status: 400 }
      );
    }

    if (!credentialOfferTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid credential type" },
        { status: 400 }
      );
    }

    // Create credential offer object
    const credentialOffer = {
      type: type,
      issuer: "did:example:issuer", // TODO: Import from config
      holder: did,
      issuanceDate: new Date().toISOString(),
      expirationDate: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(), // 30 days from now
      status: "pending",
      fields: credentialOfferData[type],
    };

    return NextResponse.json({
      success: true,
      credentialOffer,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create credential offer: ${error}` },
      { status: 500 }
    );
  }
}
