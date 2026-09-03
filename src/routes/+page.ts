/** @format */

import { error } from '@sveltejs/kit';

// api
import { getProducts } from '$api/product';

export async function load() {
  const products = await Promise.all([
    getProducts({ category: 'Feather Dusters' }, undefined, 4),
    getProducts({ category: 'Lambswool Dusters' }, undefined, 4),
    getProducts({ category: 'Feathers' }, undefined, 4),
    getProducts({ category: 'Eggshells' }, undefined, 4),
  ]);

  if (!products) {
    throw error(404, 'Not Found');
  }

  return {
    featherDusters: products[0] || [],
    lambswoolDusters: products[1] || [],
    feathers: products[2] || [],
    eggshells: products[3] || [],
  };
}
