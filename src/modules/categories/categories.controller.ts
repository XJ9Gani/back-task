import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import express from 'express';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './entity/category.entity';

@ApiTags('Category API')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary:
      'Returns all categories. Supports searching by name using ?search=your_text',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'food',
  })
  getCategories(@Query('search') search?: string) {
    return this.categoriesService.getCategories(search);
  }

  @Get('/excel')
  @ApiOperation({
    summary: 'Exports your category table to excel',
  })
  async getCategoriesExcel(@Res() res: express.Response) {
    return this.categoriesService.getCategoriesExcel(res);
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateCategoryDto,
    description: 'Category created',
  })
  @ApiOperation({
    summary: 'Create one category',
  })
  creatCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.creatCategory(dto);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: Category,
    description: 'Returned category',
  })
  @ApiOperation({
    summary: 'Returns one chosen category. Use id as parameter',
  })
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Full updating one category. Use id as parameter',
  })
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete one category. Use id as parameter',
  })
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Partial updating of one category. Use id as parameter',
  })
  updateOneProperty(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateOneProperty(id, dto);
  }
}
