import { EntityRepository, Repository } from 'typeorm';
import Item from '../domain/item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {}
