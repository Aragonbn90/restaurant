import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Dish from '../../domain/dish.entity';
import { DishService } from '../../service/dish.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/dishes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('dishes')
export class DishController {
  logger = new Logger('DishController');

  constructor(private readonly dishService: DishService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Dish
  })
  async getAll(@Req() req: Request): Promise<Dish[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.dishService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Dish
  })
  async getOne(@Param('id') id: string): Promise<Dish> {
    return await this.dishService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create dish' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Dish
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() dish: Dish): Promise<Dish> {
    const created = await this.dishService.save(dish);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Dish', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update dish' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Dish
  })
  async put(@Req() req: Request, @Body() dish: Dish): Promise<Dish> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Dish', dish.id);
    return await this.dishService.update(dish);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete dish' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Dish> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Dish', id);
    const toDelete = await this.dishService.findById(id);
    return await this.dishService.delete(toDelete);
  }
}
