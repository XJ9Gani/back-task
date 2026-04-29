import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import express from 'express';
import * as ExcelJS from 'exceljs';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(search?: string): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: search
        ? {
            name: Like(`%${search}%`),
          }
        : {},
    });
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        categoryId,
      },
    });

    if (!category) throw new NotFoundException();

    return category;
  }

  async creatCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);

    return await this.categoryRepository.save(category);
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getCategoryById(id);

    Object.assign(category, dto);

    return await this.categoryRepository.save(category);
  }

  async updateOneProperty(
    id: number,
    dto: Partial<UpdateCategoryDto>,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);

    Object.assign(category, dto);

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.getCategoryById(id);

    return await this.categoryRepository.remove(category);
  }

  async getCategoriesExcel(@Res() res: express.Response) {
    const data = await this.getCategories();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Category');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'name', key: 'name', width: 30 },
      { header: 'description', key: 'description', width: 40 },
      { header: 'price', key: 'price', width: 20 },
      { header: 'category', key: 'category', width: 20 },
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
      'attachment; filename=' + 'products.xlsx',
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
