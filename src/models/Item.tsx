import { ItemCart } from "./ItemCart";
import { ItemCategory } from "./ItemCategory";
import { ItemOrder } from "./ItemOrder";

export interface Item {
  title: string;
  category: number;
  description: string;
  picture?: string;
  price: number;
  discount_price?: number;
  available_number: number;
  total_number: number;
}

export interface DetailedItem {
  id: number;
  title: string;
  category: ItemCategory;
  description: string;
  picture?: string;
  price: number;
  discount_price?: number;
  available_number: number;
  total_number: number;
  orders_count?: string;
  refunds_requested_count?: string;
  item_carts?: ItemCart[];
  item_orders?: ItemOrder[];
}
