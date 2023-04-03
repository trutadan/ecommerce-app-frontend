import { Order } from "./Order";

export interface Payment {
  id: number;
  timestamp: string;
  amount?: string;
  order: Order;
}
