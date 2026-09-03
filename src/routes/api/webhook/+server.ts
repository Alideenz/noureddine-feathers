import { json } from "@sveltejs/kit";
import Stripe from "stripe";

// env
import { STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY } from "$env/static/private";

// api
import { insertOrder } from "$api/order";
import { insertOrderProducts } from "$api/order-product";

export async function POST({ request }: any) {
  try {
    const buf = await request.text();
    const sig = request.headers.get("stripe-signature");
    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
    const webhookSecret: string = STRIPE_WEBHOOK_SECRET;
    const event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      webhookSecret
    );

    switch (event.type) {
      case "checkout.session.completed":
        const session: any = event.data.object;
        const sessionExpanded: any = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: [
              "line_items",
              "line_items.data.price.product",
              "payment_intent.latest_charge",
            ],
          }
        );

        const newOrder: any = {
          user_profile_id: sessionExpanded.metadata?.userProfileId,
          stripe_payment_intent_id: sessionExpanded.payment_intent.id,
          stripe_receipt_url:
            sessionExpanded.payment_intent.latest_charge.receipt_url,
          shipping_address_city: sessionExpanded.customer_details.address.city,
          shipping_address_state:
            sessionExpanded.customer_details.address.state,
          shipping_address_country:
            sessionExpanded.customer_details.address.country,
          shipping_address_postal_code:
            sessionExpanded.customer_details.address.postal_code,
          shipping_address_line1:
            sessionExpanded.customer_details.address.line1,
          shipping_address_line2:
            sessionExpanded.customer_details.address.line2,
        };

        const insertedOrder = await insertOrder(newOrder);

        const newOrderProducts: any = [];

        sessionExpanded.line_items.data.forEach((line_item: any) => {
          const stripeProductId =
            typeof line_item.price.product === "string"
              ? line_item.price.product
              : line_item.price.product?.id;
          const sourceStripePriceId =
            line_item.price.product?.metadata?.source_stripe_price_id;
          const newOrderProduct = {
            order_id: insertedOrder.id,
            user_profile_id: insertedOrder.user_profile_id,
            quantity: line_item.quantity,
            stripe_product_id: stripeProductId,
            stripe_price_id: sourceStripePriceId || line_item.price.id,
          };

          newOrderProducts.push(newOrderProduct);
        });

        await insertOrderProducts(newOrderProducts);

        break;
      default:
        return json({});
    }

    return json({});
  } catch (error) {
    console.log("[webhook: error]", error);
    return json({});
  }
}
