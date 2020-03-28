import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Menu from '../domain/menu.entity';
import { MenuRepository } from '../repository/menu.repository';

@Injectable()
export class MenuService {
  logger = new Logger('MenuService');

  constructor(@InjectRepository(MenuRepository) private menuRepository: MenuRepository) {}

  async findById(id: string): Promise<Menu | undefined> {
    return await this.menuRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<Menu>): Promise<Menu | undefined> {
    return await this.menuRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Menu>): Promise<[Menu[], number]> {
    return await this.menuRepository.findAndCount(options);
  }

  async save(menu: Menu): Promise<Menu | undefined> {
    return await this.menuRepository.save(menu);
  }

  async update(menu: Menu): Promise<Menu | undefined> {
    return await this.save(menu);
  }

  async delete(menu: Menu): Promise<Menu | undefined> {
    return await this.menuRepository.remove(menu);
  }
}
