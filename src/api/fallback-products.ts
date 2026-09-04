/** @format */

import type I_Product from '$interfaces/I_Product';

const fallbackProducts: I_Product[] = [
  {
    id: 1,
    name: 'Premium Ostrich Feather Duster',
    description:
      'A handmade ostrich feather duster with soft, full feathers for delicate dusting around the home, office, and display pieces.',
    color: 'Premium Black',
    size: 16,
    size_unit: 'inches',
    category: 'Feather Dusters',
    is_hidden: false,
    rating_average: 5,
    rating_count: 12,
    prices: [
      {
        id: 1,
        product_id: 1,
        stripe_price_id: '',
        price: 75,
        quantity: 12,
        shipping_fee: 12,
        stripe_tax_rate_ids: [],
      },
      {
        id: 2,
        product_id: 1,
        stripe_price_id: '',
        price: 345,
        quantity: 60,
        shipping_fee: 45,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 7,
    name: 'Premium Ostrich Feather Duster',
    description:
      'A handmade gray ostrich feather duster with soft, treated feathers and a stained wood handle for delicate dusting.',
    color: 'Premium Gray',
    size: 16,
    size_unit: 'inches',
    category: 'Feather Dusters',
    is_hidden: false,
    rating_average: 5,
    rating_count: 11,
    prices: [
      {
        id: 7,
        product_id: 7,
        stripe_price_id: '',
        price: 75,
        quantity: 12,
        shipping_fee: 12,
        stripe_tax_rate_ids: [],
      },
      {
        id: 8,
        product_id: 7,
        stripe_price_id: '',
        price: 345,
        quantity: 60,
        shipping_fee: 45,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 3,
    name: 'Premium Ostrich Feather Duster',
    description:
      'A handmade ostrich feather duster with a stained wood handle for everyday professional and residential dusting.',
    color: 'Premium Black',
    size: 20,
    size_unit: 'inches',
    category: 'Feather Dusters',
    is_hidden: false,
    rating_average: 4.9,
    rating_count: 10,
    prices: [
      {
        id: 3,
        product_id: 3,
        stripe_price_id: '',
        price: 116.35,
        quantity: 12,
        shipping_fee: 14,
        stripe_tax_rate_ids: [],
      },
      {
        id: 4,
        product_id: 3,
        stripe_price_id: '',
        price: 507,
        quantity: 60,
        shipping_fee: 55,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 9,
    name: 'Premium Ostrich Feather Duster',
    description:
      'A handmade gray ostrich feather duster with a stained wood handle for soft, practical dusting in professional spaces.',
    color: 'Premium Gray',
    size: 20,
    size_unit: 'inches',
    category: 'Feather Dusters',
    is_hidden: false,
    rating_average: 4.9,
    rating_count: 10,
    prices: [
      {
        id: 9,
        product_id: 9,
        stripe_price_id: '',
        price: 116.35,
        quantity: 12,
        shipping_fee: 14,
        stripe_tax_rate_ids: [],
      },
      {
        id: 10,
        product_id: 9,
        stripe_price_id: '',
        price: 507,
        quantity: 60,
        shipping_fee: 55,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 11,
    name: 'Premium Ostrich Feather Duster',
    description:
      'A larger premium ostrich feather duster designed for generous coverage while staying lightweight and gentle on surfaces.',
    color: 'Premium Gray',
    size: 24,
    size_unit: 'inches',
    category: 'Feather Dusters',
    is_hidden: false,
    rating_average: 4.8,
    rating_count: 9,
    prices: [
      {
        id: 11,
        product_id: 11,
        stripe_price_id: '',
        price: 143.4,
        quantity: 12,
        shipping_fee: 16,
        stripe_tax_rate_ids: [],
      },
      {
        id: 12,
        product_id: 11,
        stripe_price_id: '',
        price: 687,
        quantity: 60,
        shipping_fee: 65,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 5,
    name: 'Premium Ostrich Feather Duster',
    description:
      'A full black ostrich feather duster for larger surfaces, lobbies, displays, and professional cleaning teams.',
    color: 'Premium Black',
    size: 24,
    size_unit: 'inches',
    category: 'Feather Dusters',
    is_hidden: false,
    rating_average: 4.8,
    rating_count: 9,
    prices: [
      {
        id: 5,
        product_id: 5,
        stripe_price_id: '',
        price: 143.4,
        quantity: 12,
        shipping_fee: 16,
        stripe_tax_rate_ids: [],
      },
      {
        id: 6,
        product_id: 5,
        stripe_price_id: '',
        price: 687,
        quantity: 60,
        shipping_fee: 65,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 13,
    name: 'Premium Extendable Lambswool Duster',
    description:
      'An extendable lambswool duster for higher shelves, ceiling fans, blinds, and everyday cleaning jobs that need extra reach.',
    color: 'Premium Black',
    size: 42,
    size_unit: 'inches',
    category: 'Lambswool Dusters',
    is_hidden: false,
    rating_average: 4.9,
    rating_count: 7,
    prices: [
      {
        id: 13,
        product_id: 13,
        stripe_price_id: '',
        price: 185.4,
        quantity: 36,
        shipping_fee: 36,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 14,
    name: 'Premium Extendable Lambswool Duster',
    description:
      'An extendable lambswool duster for higher shelves, ceiling fans, blinds, and everyday cleaning jobs that need extra reach.',
    color: 'Premium Blue',
    size: 42,
    size_unit: 'inches',
    category: 'Lambswool Dusters',
    is_hidden: false,
    rating_average: 4.9,
    rating_count: 7,
    prices: [
      {
        id: 14,
        product_id: 14,
        stripe_price_id: '',
        price: 185.4,
        quantity: 36,
        shipping_fee: 36,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 15,
    name: 'Premium Extendable Lambswool Duster',
    description:
      'An extendable lambswool duster for higher shelves, ceiling fans, blinds, and everyday cleaning jobs that need extra reach.',
    color: 'Premium Orange',
    size: 42,
    size_unit: 'inches',
    category: 'Lambswool Dusters',
    is_hidden: false,
    rating_average: 4.9,
    rating_count: 7,
    prices: [
      {
        id: 15,
        product_id: 15,
        stripe_price_id: '',
        price: 185.4,
        quantity: 36,
        shipping_fee: 36,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 16,
    name: 'Premium Lambswool Duster',
    description:
      'A compact premium lambswool duster for quick dusting, soft contact, and practical everyday cleaning.',
    color: 'Premium Black',
    size: 26,
    size_unit: 'inches',
    category: 'Lambswool Dusters',
    is_hidden: false,
    rating_average: 4.7,
    rating_count: 5,
    prices: [
      {
        id: 16,
        product_id: 16,
        stripe_price_id: '',
        price: 164.16,
        quantity: 36,
        shipping_fee: 32,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 17,
    name: 'Premium Lambswool Duster',
    description:
      'A compact premium lambswool duster for quick dusting, soft contact, and practical everyday cleaning.',
    color: 'Premium Yellow',
    size: 26,
    size_unit: 'inches',
    category: 'Lambswool Dusters',
    is_hidden: false,
    rating_average: 4.7,
    rating_count: 5,
    prices: [
      {
        id: 17,
        product_id: 17,
        stripe_price_id: '',
        price: 164.16,
        quantity: 36,
        shipping_fee: 32,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 18,
    name: 'Premium Lambswool Duster',
    description:
      'A compact premium lambswool duster for quick dusting, soft contact, and practical everyday cleaning.',
    color: 'Premium Green',
    size: 26,
    size_unit: 'inches',
    category: 'Lambswool Dusters',
    is_hidden: false,
    rating_average: 4.7,
    rating_count: 5,
    prices: [
      {
        id: 18,
        product_id: 18,
        stripe_price_id: '',
        price: 164.16,
        quantity: 36,
        shipping_fee: 32,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 19,
    name: 'Premium Lambswool Duster',
    description:
      'A compact premium lambswool duster for quick dusting, soft contact, and practical everyday cleaning.',
    color: 'Premium Orange',
    size: 26,
    size_unit: 'inches',
    category: 'Lambswool Dusters',
    is_hidden: false,
    rating_average: 4.7,
    rating_count: 5,
    prices: [
      {
        id: 19,
        product_id: 19,
        stripe_price_id: '',
        price: 164.16,
        quantity: 36,
        shipping_fee: 32,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 21,
    name: 'Ostrich Feather',
    description:
      'A premium natural ostrich feather for decoration, craft work, costumes, displays, and event styling.',
    color: 'Premium White',
    size: 12,
    size_unit: 'inches',
    category: 'Feathers',
    is_hidden: false,
    rating_average: 4.9,
    rating_count: 18,
    prices: [
      {
        id: 21001,
        product_id: 21,
        stripe_price_id: '',
        price: 2.75,
        quantity: 1,
        shipping_fee: 1,
        stripe_tax_rate_ids: [],
      },
      {
        id: 21012,
        product_id: 21,
        stripe_price_id: '',
        price: 28,
        quantity: 12,
        shipping_fee: 4,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 22,
    name: 'Ostrich Feather',
    description:
      'A vivid premium ostrich feather with soft movement and rich color for creative and decorative projects.',
    color: 'Premium Red',
    size: 12,
    size_unit: 'inches',
    category: 'Feathers',
    is_hidden: false,
    rating_average: 4.8,
    rating_count: 11,
    prices: [
      {
        id: 22001,
        product_id: 22,
        stripe_price_id: '',
        price: 2.75,
        quantity: 1,
        shipping_fee: 1,
        stripe_tax_rate_ids: [],
      },
      {
        id: 22012,
        product_id: 22,
        stripe_price_id: '',
        price: 28,
        quantity: 12,
        shipping_fee: 4,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 31,
    name: 'Ostrich Eggshell',
    description:
      'A decorative ostrich eggshell with detailed artwork, suited for display pieces and gifts.',
    color: 'Lion',
    size: null,
    size_unit: 'null',
    category: 'Eggshells',
    is_hidden: false,
    rating_average: 5,
    rating_count: 4,
    prices: [
      {
        id: 31001,
        product_id: 31,
        stripe_price_id: '',
        price: 120,
        quantity: 1,
        shipping_fee: 18,
        stripe_tax_rate_ids: [],
      },
    ],
  },
  {
    id: 32,
    name: 'Ostrich Eggshell',
    description:
      'A hand-decorated ostrich eggshell with a natural display finish and carefully detailed illustration.',
    color: 'Africa',
    size: null,
    size_unit: 'null',
    category: 'Eggshells',
    is_hidden: false,
    rating_average: 5,
    rating_count: 3,
    prices: [
      {
        id: 32001,
        product_id: 32,
        stripe_price_id: '',
        price: 120,
        quantity: 1,
        shipping_fee: 18,
        stripe_tax_rate_ids: [],
      },
    ],
  },
];

const getFallbackProducts = (
  filters: { [key: string]: string | number | boolean } = {},
  limit = 100
) => {
  return fallbackProducts
    .filter((product) => {
      return Object.entries(filters).every(([key, value]) => {
        return product[key as keyof I_Product] === value;
      });
    })
    .slice(0, limit);
};

const getFallbackProductById = (id: string | number) => {
  return fallbackProducts.find((product) => `${product.id}` === `${id}`);
};

const getFallbackProductPricesByIds = (productPriceIds: number[]) => {
  return fallbackProducts
    .flatMap((product) => product.prices)
    .filter((price) => productPriceIds.includes(price.id));
};

export {
  fallbackProducts,
  getFallbackProductById,
  getFallbackProductPricesByIds,
  getFallbackProducts,
};
