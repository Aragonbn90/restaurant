import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Dish from '../domain/dish.entity';
import { DishRepository } from '../repository/dish.repository';

@Injectable()
export class DishService {
  logger = new Logger('DishService');

  constructor(@InjectRepository(DishRepository) private dishRepository: DishRepository) {}

  async findById(id: string): Promise<Dish | undefined> {
    return await this.dishRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<Dish>): Promise<Dish | undefined> {
    return await this.dishRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Dish>): Promise<[Dish[], number]> {
    return await this.dishRepository.findAndCount(options);
  }

  async save(dish: Dish): Promise<Dish | undefined> {
    return await this.dishRepository.save(dish);
  }

  async update(dish: Dish): Promise<Dish | undefined> {
    return await this.save(dish);
  }

  async delete(dish: Dish): Promise<Dish | undefined> {
    return await this.dishRepository.remove(dish);
  }
}
