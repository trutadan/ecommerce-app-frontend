import { Coupon } from "./Coupon";
import { OrderAddress } from "./OrderAddress";
import { User } from "./User";

export interface Order {
  id: number;
  items_count: string;
  start_date: string;
  ordered_date: string;
  being_delivered: boolean;
  received: boolean;
  refund_requested: boolean;
  refund_granted: boolean;
  user: User;
  shipping_address?: OrderAddress;
  billing_address?: OrderAddress;
  coupon?: Coupon;
}
