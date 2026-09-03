import { getOrderProducts } from "$api/order-product.js";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession }, params }) => {
  const session = await getSession();

  let orderProducts: any = [];

  if (session) {
    orderProducts = await getOrderProducts({
      order_id: params.id,
      user_profile_id: session.user.id,
    });
  }

  return { orderProducts };
};
