/** @format */

import type I_Product from '$interfaces/I_Product';
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';

type PriceOverride = {
  price: number;
  shipping_fee: number;
  checkoutName: string;
};

type OverriddenProductPrice = I_ProductPriceTableRecord & {
  price_source?: 'price-list-override';
  checkout_name?: string;
};

const dusterPriceOverrides: Record<number, Record<number, PriceOverride>> = {
  1: {
    12: { price: 75, shipping_fee: 12, checkoutName: '16 inch premium black ostrich feather duster, 1 dozen' },
    60: { price: 345, shipping_fee: 45, checkoutName: '16 inch premium black ostrich feather duster, 5 dozen' },
  },
  3: {
    12: { price: 107.4, shipping_fee: 14, checkoutName: '20 inch premium black ostrich feather duster, 1 dozen' },
    60: { price: 507, shipping_fee: 55, checkoutName: '20 inch premium black ostrich feather duster, 5 dozen' },
  },
  5: {
    12: { price: 143.4, shipping_fee: 16, checkoutName: '24 inch premium black ostrich feather duster, 1 dozen' },
    60: { price: 687, shipping_fee: 65, checkoutName: '24 inch premium black ostrich feather duster, 5 dozen' },
  },
  7: {
    12: { price: 75, shipping_fee: 12, checkoutName: '16 inch premium gray ostrich feather duster, 1 dozen' },
    60: { price: 345, shipping_fee: 45, checkoutName: '16 inch premium gray ostrich feather duster, 5 dozen' },
  },
  9: {
    12: { price: 107.4, shipping_fee: 14, checkoutName: '20 inch premium gray ostrich feather duster, 1 dozen' },
    60: { price: 507, shipping_fee: 55, checkoutName: '20 inch premium gray ostrich feather duster, 5 dozen' },
  },
  11: {
    12: { price: 143.4, shipping_fee: 16, checkoutName: '24 inch premium gray ostrich feather duster, 1 dozen' },
    60: { price: 687, shipping_fee: 65, checkoutName: '24 inch premium gray ostrich feather duster, 5 dozen' },
  },
  13: {
    36: { price: 185.4, shipping_fee: 36, checkoutName: '42 inch premium black extendable lambswool duster, 3 dozen' },
  },
  14: {
    36: { price: 185.4, shipping_fee: 36, checkoutName: '42 inch premium blue extendable lambswool duster, 3 dozen' },
  },
  15: {
    36: { price: 185.4, shipping_fee: 36, checkoutName: '42 inch premium orange extendable lambswool duster, 3 dozen' },
  },
  16: {
    36: { price: 149.4, shipping_fee: 32, checkoutName: '26 inch premium black lambswool duster, 3 dozen' },
  },
  17: {
    36: { price: 149.4, shipping_fee: 32, checkoutName: '26 inch premium yellow lambswool duster, 3 dozen' },
  },
  18: {
    36: { price: 149.4, shipping_fee: 32, checkoutName: '26 inch premium green lambswool duster, 3 dozen' },
  },
  19: {
    36: { price: 149.4, shipping_fee: 32, checkoutName: '26 inch premium orange lambswool duster, 3 dozen' },
  },
};

const normalizeProductPrice = (
  productPrice: I_ProductPriceTableRecord
): OverriddenProductPrice => {
  const override =
    dusterPriceOverrides[productPrice.product_id]?.[productPrice.quantity];

  if (!override) return productPrice;

  return {
    ...productPrice,
    price: override.price,
    shipping_fee: override.shipping_fee,
    checkout_name: override.checkoutName,
    price_source: 'price-list-override',
  };
};

const normalizeProductPrices = (prices: I_ProductPriceTableRecord[] = []) => {
  return prices
    .map(normalizeProductPrice)
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
