import { User } from "./User";

export interface Cart {
  id: number;
  items_count: string;
  created_at: string;
  user: User;
}
