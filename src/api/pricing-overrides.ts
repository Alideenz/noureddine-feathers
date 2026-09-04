/** @format */

import type I_Product from '$interfaces/I_Product';
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';

type PriceOverride = {
  price: number;
  shipping_fee: number;
  checkoutName: string;
  stripePriceIds?: string[];
};

type OverriddenProductPrice = I_ProductPriceTableRecord & {
  price_source?: 'price-list-override';
  checkout_name?: string;
};

const dusterPriceOverrides: Record<number, Record<number, PriceOverride>> = {
  1: {
    12: { price: 75, shipping_fee: 12, checkoutName: '16 inch premium black ostrich feather duster, 1 dozen', stripePriceIds: ['price_1UBkuULZu68tNdkBsPZ4Fekd'] },
    60: { price: 345, shipping_fee: 45, checkoutName: '16 inch premium black ostrich feather duster, 5 dozen', stripePriceIds: ['price_1UBkuqLZu68tNdkBins9IX3u'] },
  },
  3: {
    12: { price: 116.35, shipping_fee: 14, checkoutName: '20 inch premium black ostrich feather duster, 1 dozen', stripePriceIds: ['price_1UC2lgLZu68tNdkBjygGOjjT'] },
    60: { price: 507, shipping_fee: 55, checkoutName: '20 inch premium black ostrich feather duster, 5 dozen', stripePriceIds: ['price_1UC2muLZu68tNdkBpycUjrmM'] },
  },
  5: {
    12: { price: 143.4, shipping_fee: 16, checkoutName: '24 inch premium black ostrich feather duster, 1 dozen', stripePriceIds: ['price_1UC2ofLZu68tNdkB8yIuq2hS'] },
    60: { price: 687, shipping_fee: 65, checkoutName: '24 inch premium black ostrich feather duster, 5 dozen', stripePriceIds: ['price_1UC2p6LZu68tNdkBjj3wy7JV'] },
  },
  7: {
    12: { price: 75, shipping_fee: 12, checkoutName: '16 inch premium gray ostrich feather duster, 1 dozen', stripePriceIds: ['price_1UC2qpLZu68tNdkBRdoaM7sA'] },
    60: { price: 345, shipping_fee: 45, checkoutName: '16 inch premium gray ostrich feather duster, 5 dozen', stripePriceIds: ['price_1UC2qzLZu68tNdkBHHFJYa5Z'] },
  },
  9: {
    12: { price: 116.35, shipping_fee: 14, checkoutName: '20 inch premium gray ostrich feather duster, 1 dozen', stripePriceIds: ['price_1UC2sHLZu68tNdkBGYJyMAMX'] },
    60: { price: 507, shipping_fee: 55, checkoutName: '20 inch premium gray ostrich feather duster, 5 dozen', stripePriceIds: ['price_1UC2sdLZu68tNdkBz9BnVmDF'] },
  },
  11: {
    12: { price: 143.4, shipping_fee: 16, checkoutName: '24 inch premium gray ostrich feather duster, 1 dozen', stripePriceIds: ['price_1UC2t5LZu68tNdkBRUm7VXRd'] },
    60: { price: 687, shipping_fee: 65, checkoutName: '24 inch premium gray ostrich feather duster, 5 dozen', stripePriceIds: ['price_1UC2tMLZu68tNdkBsZ5DGQM7'] },
  },
  13: {
    36: { price: 185.4, shipping_fee: 36, checkoutName: '42 inch premium black extendable lambswool duster, 3 dozen', stripePriceIds: ['price_1UC309LZu68tNdkBclHTVHor'] },
  },
  14: {
    36: { price: 185.4, shipping_fee: 36, checkoutName: '42 inch premium blue extendable lambswool duster, 3 dozen', stripePriceIds: ['price_1UC2ziLZu68tNdkBISloW0N7'] },
  },
  15: {
    36: { price: 185.4, shipping_fee: 36, checkoutName: '42 inch premium orange extendable lambswool duster, 3 dozen', stripePriceIds: ['price_1UC2zFLZu68tNdkBYSLCnJth'] },
  },
  16: {
    36: { price: 164.16, shipping_fee: 32, checkoutName: '26 inch premium black lambswool duster, 3 dozen', stripePriceIds: ['price_1MLcu6LZu68tNdkBDfUXDS7h'] },
  },
  17: {
    36: { price: 164.16, shipping_fee: 32, checkoutName: '26 inch premium yellow lambswool duster, 3 dozen', stripePriceIds: ['price_1MLcuiLZu68tNdkB5Wh2i26g'] },
  },
  18: {
    36: { price: 164.16, shipping_fee: 32, checkoutName: '26 inch premium green lambswool duster, 3 dozen', stripePriceIds: ['price_1MLcvDLZu68tNdkBWBSV9TJp'] },
  },
  19: {
    36: { price: 164.16, shipping_fee: 32, checkoutName: '26 inch premium orange lambswool duster, 3 dozen', stripePriceIds: ['price_1MLcvbLZu68tNdkBQabEFf3C'] },
  },
};

const normalizeProductPrice = (
  productPrice: I_ProductPriceTableRecord
): OverriddenProductPrice => {
  const override =
    dusterPriceOverrides[productPrice.product_id]?.[productPrice.quantity];

  if (!override) return productPrice;

  const usesCurrentStripePrice = override.stripePriceIds?.includes(
    productPrice.stripe_price_id
  );

  return {
    ...productPrice,
    price: override.price,
    shipping_fee: override.shipping_fee,
    checkout_name: override.checkoutName,
    price_source: usesCurrentStripePrice ? undefined : 'price-list-override',
  };
};

const normalizeProductPrices = (prices: I_ProductPriceTableRecord[] = []) => {
  return prices
    .map(normalizeProductPrice)
    .sort((a, b) => {
      if (a.price_source !== b.price_source) {
        return a.price_source === 'price-list-override' ? 1 : -1;
      }

      return a.id - b.id;
    })
    .filter((price, index, productPrices) => {
      return productPrices.findIndex(
        (productPrice) =>
          productPrice.product_id === price.product_id &&
          productPrice.quantity === price.quantity
      ) === index;
    })
    .sort((a, b) => a.price - b.price);
};

const normalizeProduct = (product: I_Product): I_Product => {
  return {
    ...product,
    prices: normalizeProductPrices(product.prices),
  };
};

export {
  normalizeProduct,
  normalizeProductPrice,
  normalizeProductPrices,
  type OverriddenProductPrice,
};
