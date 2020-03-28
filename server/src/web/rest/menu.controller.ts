import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Menu from '../../domain/menu.entity';
import { MenuService } from '../../service/menu.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/menus')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('menus')
export class MenuController {
  logger = new Logger('MenuController');

  constructor(private readonly menuService: MenuService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Menu
  })
  async getAll(@Req() req: Request): Promise<Menu[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.menuService.findAndCount({
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
    type: Menu
  })
  async getOne(@Param('id') id: string): Promise<Menu> {
    return await this.menuService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create menu' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Menu
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() menu: Menu): Promise<Menu> {
    const created = await this.menuService.save(menu);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Menu', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update menu' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Menu
  })
  async put(@Req() req: Request, @Body() menu: Menu): Promise<Menu> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Menu', menu.id);
    return await this.menuService.update(menu);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete menu' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Menu> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Menu', id);
    const toDelete = await this.menuService.findById(id);
    return await this.menuService.delete(toDelete);
  }
}
