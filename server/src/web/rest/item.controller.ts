import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Item from '../../domain/item.entity';
import { ItemService } from '../../service/item.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/items')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('items')
export class ItemController {
  logger = new Logger('ItemController');

  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Item
  })
  async getAll(@Req() req: Request): Promise<Item[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.itemService.findAndCount({
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
    type: Item
  })
  async getOne(@Param('id') id: string): Promise<Item> {
    return await this.itemService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create item' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Item
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() item: Item): Promise<Item> {
    const created = await this.itemService.save(item);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Item', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update item' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Item
  })
  async put(@Req() req: Request, @Body() item: Item): Promise<Item> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Item', item.id);
    return await this.itemService.update(item);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete item' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Item> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Item', id);
    const toDelete = await this.itemService.findById(id);
    return await this.itemService.delete(toDelete);
  }
}
