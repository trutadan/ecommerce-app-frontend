import { ItemCategory } from "./ItemCategory";

export interface Item {
  id: number;
  orders_count: string;
  refunds_requested_count: string;
  title: string;
  price: number;
  discount_price?: number;
  available_number: number;
  total_number: number;
  description: string;
  picture?: string;
  category: ItemCategory;
}
