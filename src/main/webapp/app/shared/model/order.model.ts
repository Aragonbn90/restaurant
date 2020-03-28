import { IDish } from 'app/shared/model/dish.model';

export interface IOrder {
  id?: number;
  code?: string;
  total?: number;
  discount?: number;
  discountPercent?: number;
  totalAfterDiscount?: number;
  description?: string;
  dishes?: IDish[];
}

export const defaultValue: Readonly<IOrder> = {};
