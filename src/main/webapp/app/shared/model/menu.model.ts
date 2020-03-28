import { IItem } from 'app/shared/model/item.model';

export interface IMenu {
  id?: number;
  name?: string;
  description?: string;
  items?: IItem[];
}

export const defaultValue: Readonly<IMenu> = {};
