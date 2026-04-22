import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    dto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);

    Object.assign(category, dto);

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.getCategoryById(id);

    return await this.categoryRepository.remove(category);
  }
}
