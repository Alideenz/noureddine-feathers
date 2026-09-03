/** @format */

import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import type { RequestHandler } from './$types';

// env
import { STRIPE_SECRET_KEY } from '$env/static/private';

// api
import { getProductPricesByIds } from '$api/product';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { userProfileId, products } = await request.json();

    if (!Array.isArray(products) || products.length === 0) {
      return json({ error: 'Your cart is empty.' }, { status: 400 });
    }

    const productPriceIds: number[] = products.map(
      (product: any) => product.productPriceId
    );

    const productPrices: any[] = await getProductPricesByIds(productPriceIds);

    let lineItems: any[] = [];
    let orderCost = 0;
    let shippingCost = 0;

    let i = 0;
    while (i < products.length) {
      const product: any = products[i];
      const productPrice: any = productPrices.find(
        (productPrice: any) => productPrice.id === product.productPriceId
      );

      if (
        !productPrice?.stripe_price_id &&
        productPrice.price_source !== 'price-list-override'
      ) {
        return json(
          { error: 'This item is not available for checkout right now.' },
          { status: 400 }
        );
      }

      const lineItem: any = productPrice.price_source === 'price-list-override'
        ? {
            price_data: {
              currency: 'cad',
              product_data: {
                name: productPrice.checkout_name || 'Noureddine Feathers item',
                metadata: productPrice.stripe_price_id
                  ? { source_stripe_price_id: productPrice.stripe_price_id }
                  : {},
              },
              unit_amount: Math.round(productPrice.price * 100),
            },
            tax_rates: productPrice.stripe_tax_rate_ids || [],
            quantity: product.quantity,
          }
        : {
            price: productPrice.stripe_price_id,
            tax_rates: productPrice.stripe_tax_rate_ids || [],
            quantity: product.quantity,
          };

      lineItems.push(lineItem);

      orderCost = orderCost + productPrice.price * product.quantity;
      shippingCost =
        shippingCost + (productPrice.shipping_fee || 0) * product.quantity;

      i++;
    }

    // orders above $950 have free delivery
    if (orderCost > 950) shippingCost = 0;

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      shipping_address_collection: { allowed_countries: ['CA', 'US'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: Math.round(shippingCost * 100), currency: 'cad' },
            display_name:
              shippingCost > 0 ? 'Standard delivery' : 'Free delivery',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 7 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      line_items: lineItems,
      metadata: { userProfileId },
      success_url: `${request.headers.get('Origin')}/info/payment-success`,
      cancel_url: `${request.headers.get('Origin')}/info/payment-cancel`,
    });

    return json({ id: session.id });
  } catch (error) {
    console.log('[checkout: error]', error);
    return json({ error: 'Checkout could not be started. Try again later.' }, { status: 500 });
  }
};
