import { EntityRepository, Repository } from 'typeorm';
import Dish from '../domain/dish.entity';

@EntityRepository(Dish)
export class DishRepository extends Repository<Dish> {}
