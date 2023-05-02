import { UserAddress } from "./UserAddress";
import { UserProfile } from "./UserProfile";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_at: string;
  address?: UserAddress;
  profile?: UserProfile;
}

export interface UserInformation {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_at: string;
  is_active: boolean;
  address?: UserAddress;
  profile?: UserProfile;
}
