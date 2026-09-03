interface I_ProductPriceTableRecord {
  id: number;
  created_at?: string;
  stripe_price_id: string;
  product_id: number;
  price: number;
  quantity: number;
  shipping_fee?: number;
  stripe_tax_rate_ids?: string[];
}

export default I_ProductPriceTableRecord;
