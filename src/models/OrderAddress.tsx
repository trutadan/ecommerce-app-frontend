export interface OrderAddress {
  id: number;
  country: string;
  state: string;
  city: string;
  street: string;
  apartment?: string;
  zip_code: string;
}
