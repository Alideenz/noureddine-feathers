/** @format */

// interfaces
import type I_Product from '$interfaces/I_Product';

// helpers
import { groupBy } from '$helpers/helpers';
import {
  getFallbackProductById,
  getFallbackProductPricesByIds,
  getFallbackProducts,
} from '$api/fallback-products';
import {
  normalizeProduct,
  normalizeProductPrices,
} from '$api/pricing-overrides';

// config
import supabase from '$config/supabase';

const SB_TEST = false;

const getProductById = async (id: string): Promise<I_Product | undefined> => {
  let product: I_Product | undefined = undefined;

  const productQuery = supabase
    .from('product')
    .select(
      'id, name, description, color, size, size_unit, rating_average, rating_count, category'
    )
    .match({ id, is_hidden: SB_TEST });

  const productPriceQuery = supabase
    .from('product_price')
    .select(
      'id, price, quantity, shipping_fee, product_id, stripe_price_id, stripe_tax_rate_ids'
    )
    .order('price', { ascending: true })
    .match({ product_id: id, is_hidden: SB_TEST });

  const [
    { data: productData, error: productError },
    { data: productPriceData, error: productPriceError },
  ] = await Promise.all([productQuery, productPriceQuery]);

  if (productError || productPriceError) {
    console.log('[getProductById]:[error]', productError, productPriceError);
    return getFallbackProductById(id);
  }

  if (!productData || !productPriceData) {
    console.log('[getProductById]:[null]', productData, productPriceData);
    return getFallbackProductById(id);
  }

  if (productData.length === 0) return getFallbackProductById(id);

  const groupedProductPriceData = groupBy(productPriceData, 'product_id');

  product = productData.map((productRecord: any) => {
    const product: I_Product = {
      ...productRecord,
      prices: groupedProductPriceData[productRecord.id] || [],
    };

    return product;
  })[0];

  return normalizeProduct(product);
};

const getProducts = async (
  filters: { [key: string]: string | number | boolean } = {},
  sort: { key: string; value: { ascending: boolean } } = {
    key: 'id',
    value: { ascending: true },
  },
  limit: number = 100
): Promise<I_Product[] | undefined> => {
  let products: I_Product[] = [];

  const productQuery = supabase
    .from('product')
    .select(
      'id, name, color, size, size_unit, rating_average, rating_count, category'
    )
    .match({ ...filters, is_hidden: SB_TEST })
    .order(sort.key, sort.value)
    .limit(limit);

  const productPriceQuery = supabase
    .from('product_price')
    .select(
      'id, price, quantity, shipping_fee, product_id, stripe_price_id, stripe_tax_rate_ids'
    )
    .order('price', { ascending: true })
    .match({ is_hidden: SB_TEST });

  const [
    { data: productData, error: productError },
    { data: productPriceData, error: productPriceError },
  ] = await Promise.all([productQuery, productPriceQuery]);

  if (productError || productPriceError) {
    console.log('[getProducts]:[error]', productError, productPriceError);
    return getFallbackProducts(filters, limit);
  }

  if (!productData || !productPriceData) {
    console.log('[getProducts]:[null]', productData, productPriceData);
    return getFallbackProducts(filters, limit);
  }

  const groupedProductPriceData = groupBy(productPriceData, 'product_id');

  products = productData.map((productRecord: any) => {
    const product: I_Product = {
      ...productRecord,
      prices: groupedProductPriceData[productRecord.id] || [],
    };

    return product;
  });

  if (products.length === 0) return getFallbackProducts(filters, limit);

  return products.map(normalizeProduct);
};

const getProductPricesByIds = async (productPriceIds: any) => {
  const { data, error } = await supabase
    .from('product_price')
    .select(
      'id, price, quantity, shipping_fee, product_id, stripe_price_id, stripe_tax_rate_ids'
    )
    .in('id', productPriceIds)
    .match({ is_hidden: SB_TEST });

  if (error) {
    console.log('[getProductPricesByIds]:[error]', error);
    return getFallbackProductPricesByIds(productPriceIds);
  }

  if (!data) return getFallbackProductPricesByIds(productPriceIds);

  return normalizeProductPrices(data);
};

export { getProductById, getProducts, getProductPricesByIds };
