import { Order } from "./Order";

export interface Refund {
  id: number;
  reason: string;
  accepted: boolean;
  order?: Order;
}
