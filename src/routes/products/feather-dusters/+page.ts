import { error } from "@sveltejs/kit";

// api
import { getProducts } from "$api/product";

// interfaces
import type I_Product from "$interfaces/I_Product";

export async function load() {
  const products: I_Product[] | undefined = await getProducts({
    category: "Feather Dusters",
  });

  if (!products) {
    throw error(404, "Not Found");
  }

  return { products };
}
