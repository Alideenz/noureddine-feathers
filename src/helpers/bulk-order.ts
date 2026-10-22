import { normalizeProductPrice } from '$api/pricing-overrides';

export type BulkColor = { label: string; hex: string };
export type BulkDuster = {
  id: string;
  name: string;
  category: 'Feather dusters' | 'Lambswool dusters';
  size: string;
  handle: string;
  bestFor: string;
  colors: BulkColor[];
  priceTiers: { dozens: number; total: number }[];
  imageName: string;
  imageSize: number;
};

const colors: Record<string, BulkColor> = {
  Black: { label: 'Black', hex: '#242724' },
  Gray: { label: 'Gray', hex: '#929994' },
  Yellow: { label: 'Yellow', hex: '#f4d44f' },
  Green: { label: 'Green', hex: '#3f7d4c' },
  Orange: { label: 'Orange', hex: '#ed7624' },
  Blue: { label: 'Blue', hex: '#2b67c4' },
};

// Use the same price overrides as product pages and checkout.
const tiers = (productId: number, quantities: number[]) =>
  quantities.map((quantity) => ({
    dozens: quantity / 12,
    total: normalizeProductPrice({
      id: 0,
      product_id: productId,
      quantity,
      price: 0,
      stripe_price_id: '',
    }).price,
  }));

export const bulkDusters: BulkDuster[] = [
  {
    id: 'ostrich-16',
    name: 'Ostrich feather duster',
    category: 'Feather dusters',
    size: '16 inches',
    handle: 'Short wood handle',
    bestFor: 'Desks, counters and shelves',
    colors: [colors.Black, colors.Gray],
    priceTiers: tiers(1, [12, 60]),
    imageName: 'Premium-Ostrich-Feather-Duster',
    imageSize: 16,
  },
  {
    id: 'ostrich-20',
    name: 'Ostrich feather duster',
    category: 'Feather dusters',
    size: '20 inches',
    handle: 'Wood handle',
    bestFor: 'Offices, ledges and shelving',
    colors: [colors.Black, colors.Gray],
    priceTiers: tiers(3, [12, 60]),
    imageName: 'Premium-Ostrich-Feather-Duster',
    imageSize: 20,
  },
  {
    id: 'ostrich-24',
    name: 'Ostrich feather duster',
    category: 'Feather dusters',
    size: '24 inches',
    handle: 'Long wood handle',
    bestFor: 'Fixtures and higher shelves',
    colors: [colors.Gray, colors.Black],
    priceTiers: tiers(5, [12, 60]),
    imageName: 'Premium-Ostrich-Feather-Duster',
    imageSize: 24,
  },
  {
    id: 'lambswool-26',
    name: 'Lambswool duster',
    category: 'Lambswool dusters',
    size: '26 inches',
    handle: 'Standard handle',
    bestFor: 'General dusting and daily cleaning',
    colors: [colors.Yellow, colors.Black, colors.Green, colors.Orange],
    priceTiers: tiers(16, [36]),
    imageName: 'Premium-Lambswool-Duster',
    imageSize: 26,
  },
  {
    id: 'lambswool-42',
    name: 'Extendable lambswool duster',
    category: 'Lambswool dusters',
    size: '26-42 inches',
    handle: 'Extendable handle',
    bestFor: 'Vents, ceiling fans and high shelves',
    colors: [colors.Black, colors.Blue, colors.Orange],
    priceTiers: tiers(13, [36]),
    imageName: 'Premium-Extendable-Lambswool-Duster',
    imageSize: 42,
  },
  {
    id: 'lambswool-detachable',
    name: 'Detachable lambswool duster',
    category: 'Lambswool dusters',
    size: '20-inch head',
    handle: '41-65 inch detachable handle',
    bestFor: 'Tall fixtures and extension work',
    colors: [colors.Black, colors.Yellow],
    priceTiers: [{ dozens: 2, total: 206.4 }],
    imageName: '',
    imageSize: 0,
  },
];

export const getBulkImage = (duster: BulkDuster, color: string) => {
  if (!duster.imageName) return '';
  const name = `${duster.imageName}-Premium-${color}-${duster.imageSize}-inches`;
  return `/products/${name}/0-${name}-1024x1024.webp`;
};

export const clampDozens = (value: number, minimum = 0) =>
  Math.max(minimum, Math.min(200, Math.floor(Number(value) || 0)));
export const selectionKey = (id: string, color: string) => `${id}:${color}`;
export const getBulkTier = (duster: BulkDuster, dozens: number) =>
  [...duster.priceTiers].reverse().find((tier) => dozens >= tier.dozens) ||
  duster.priceTiers[0];
export const estimateBulkLine = (duster: BulkDuster, dozens: number) => {
  const tier = getBulkTier(duster, dozens);
  return Math.round((tier.total * 100 * dozens) / tier.dozens) / 100;
};
export const getPresetQuantities = (preset: string): Record<string, number> => {
  if (preset === 'custom') return {};
  const multiplier = preset === '24-dozen' ? 2 : 1;
  return Object.fromEntries(
    bulkDusters.map((duster) => [
      selectionKey(duster.id, duster.colors[0].label),
      (duster.id.startsWith('ostrich')
        ? 3
        : duster.id === 'lambswool-26'
        ? 2
        : duster.id === 'lambswool-42'
        ? 1
        : 0) * multiplier,
    ])
  );
};
