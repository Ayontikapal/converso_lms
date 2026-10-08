import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2025-02-24.acacia" as any,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { planName, priceAmount } = await req.json();

    if (!priceAmount || priceAmount === 0) {
      return NextResponse.json({ url: "/my-journey" });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planName || "Converso Subscription",
              description: `Upgrade to ${planName} for unlimited AI companion sessions.`,
            },
            unit_amount: Math.round(priceAmount * 100),
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/my-journey?success=true`,
      cancel_url: `${origin}/subscription?canceled=true`,
      metadata: {
        userId: userId,
        userEmail: user.emailAddresses?.[0]?.emailAddress || "",
        planName: planName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    return new NextResponse(error?.message || "Internal Server Error", { status: 500 });
  }
}
