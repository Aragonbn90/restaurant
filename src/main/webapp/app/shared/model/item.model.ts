import { IMenu } from 'app/shared/model/menu.model';

export interface IItem {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  active?: boolean;
  image?: string;
  menu?: IMenu;
}

export const defaultValue: Readonly<IItem> = {
  active: false
};
