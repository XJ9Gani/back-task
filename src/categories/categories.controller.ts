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
import * as ExcelJS from 'exceljs';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategopries(@Query('search') search?: string) {
    return this.categoriesService.getCategories(search);
  }

  @Get('/excel')
  async getProductsExcel(@Res() res: express.Response) {
    const data = this.categoriesService.getCategories();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'name', key: 'name', width: 30 },
      { header: 'description', key: 'description', width: 40 },
      { header: 'createdAt', key: 'createdAt', width: 20 },
      { header: 'category', key: 'updatedAt', width: 20 },
      { header: 'deletedAt', key: 'deletedAt', width: 20 },
    ];

    worksheet.addRows(data);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'categories.xlsx',
    );

    await workbook.xlsx.write(res);
    res.end();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  CreateCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Put('/:id')
  updateCategory(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Patch('/:id')
  updateOneProperty(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.updateOneProperty(id, dto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
