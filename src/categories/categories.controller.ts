import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query('search') search?: string) {
    return this.categoriesService.getCategories(search);
  }

  @Get('/excel')
  async getCategoriesExcel(@Res() res: express.Response) {
    return this.categoriesService.getCategoriesExcel(res);
  }

  @Post()
  creatCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.creatCategory(dto);
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(+id);
  }

  @Put('/:id')
  updateCategory(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }

  @Patch('/:id')
  updateOneProperty(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.updateOneProperty(id, dto);
  }
}
