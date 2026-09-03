interface I_CartItem {
  product_id: number;
  product_price_id: number;
  name: string;
  category: string;
  color: string;
  size: number | null;
  size_unit: string;
  price: number;
  quantity: number;
  stripe_price_id?: string;
  cart_item_quantity: number;
}

export default I_CartItem;
