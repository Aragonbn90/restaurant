export interface IDish {
  id?: number;
  price?: number;
  description?: string;
  orderId?: number;
}

export const defaultValue: Readonly<IDish> = {};
