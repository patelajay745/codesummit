import { db } from "@/libs/db";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { env } from "@/validators/env";
import { Request, Response } from "express";
import Stripe from "stripe";

// This is your test secret API key.
const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

// const YOUR_DOMAIN = 'http://localhost:4242';

export const checkout = asyncHandler(async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ["card"],
        metadata: {
            userId: req.user!.id
        },
        customer_email: req.user?.email,
        billing_address_collection: "required",
        line_items: req.body.items.map((item: { name: string, price: number, quantity: number }) => {
            return {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity
            }
        }),

        success_url: `${env.CORS_ORIGIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.CORS_ORIGIN}/cancel`,
    });

    res.json(session);
})

// export const webhook = asyncHandler((request: Request, response: Response) => {
//     const event = request.body;

//     // Handle the event
//     switch (event.type) {
//         case 'payment_intent.succeeded':
//             const paymentIntent = event.data.object;
//             // Then define and call a method to handle the successful payment intent.
//             // handlePaymentIntentSucceeded(paymentIntent);
//             break;
//         case 'payment_method.attached':
//             const paymentMethod = event.data.object;
//             // Then define and call a method to handle the successful attachment of a PaymentMethod.
//             // handlePaymentMethodAttached(paymentMethod);
//             break;
//         // ... handle other event types
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a response to acknowledge receipt of the event
//     response.json({ received: true });
// });

export const fullfillCheckout = asyncHandler(async (req: Request, res: Response) => {

    const sessionId = req.params["id"]
    const userId = req.user?.id

    if (!userId) throw new ApiError(401, "Use not found")

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

    if (checkoutSession.payment_status !== 'unpaid') {

    }

    if (!checkoutSession) throw new ApiError(400, "Invalid Purchase ID")

    if (checkoutSession.payment_status !== 'paid')
        throw new ApiError(400, 'Payment not completed');

    const lineItem = checkoutSession.line_items?.data[0];
    if (!lineItem || !lineItem.description)
        throw new ApiError(400, 'Missing line‑item description');

    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(now.getMonth() + 1);

    const data = {
        userId: userId,
        productName: lineItem.description!,
        price: lineItem.amount_subtotal ?? 0,
        currency: checkoutSession.currency || "",
        quantity: String(lineItem.quantity ?? 1), // quantity is String in your model
        totalAmount: checkoutSession.amount_total ?? 0,
        paymentStatus: checkoutSession.payment_status,
        customerEmail: checkoutSession.customer_details?.email ?? '',
        customerName: checkoutSession.customer_details?.name ?? '',
        billingAddress: checkoutSession.customer_details?.address ?? {},
        sessionId: checkoutSession.id,
        paymentIntent: checkoutSession.payment_intent?.toString() ?? '',
        purchaseDate: now.toISOString(),
        nextMonthDate: nextMonth.toISOString(),
    };

    const purchase = await db.purchase.upsert({
        where: { sessionId: checkoutSession.id },
        update: data,
        create: { ...data, sessionId: checkoutSession.id },
    })

    res.status(200).json(new ApiResponse(200, "Session data", purchase))

})