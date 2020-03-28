import { EntityRepository, Repository } from 'typeorm';
import Menu from '../domain/menu.entity';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {}
