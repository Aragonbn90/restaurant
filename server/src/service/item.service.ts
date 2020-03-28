import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Item from '../domain/item.entity';
import { ItemRepository } from '../repository/item.repository';

@Injectable()
export class ItemService {
  logger = new Logger('ItemService');

  constructor(@InjectRepository(ItemRepository) private itemRepository: ItemRepository) {}

  async findById(id: string): Promise<Item | undefined> {
    return await this.itemRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<Item>): Promise<Item | undefined> {
    return await this.itemRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Item>): Promise<[Item[], number]> {
    return await this.itemRepository.findAndCount(options);
  }

  async save(item: Item): Promise<Item | undefined> {
    return await this.itemRepository.save(item);
  }

  async update(item: Item): Promise<Item | undefined> {
    return await this.save(item);
  }

  async delete(item: Item): Promise<Item | undefined> {
    return await this.itemRepository.remove(item);
  }
}
