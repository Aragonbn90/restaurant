import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishController } from '../web/rest/dish.controller';
import { DishRepository } from '../repository/dish.repository';
import { DishService } from '../service/dish.service';

@Module({
  imports: [TypeOrmModule.forFeature([DishRepository])],
  controllers: [DishController],
  providers: [DishService],
  exports: [DishService]
})
export class DishModule {}
