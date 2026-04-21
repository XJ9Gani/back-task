import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  private categories = [
    {
      id: 1,
      name: 'Food',
      description: 'This category includes all kinds of food products',
    },
    {
      id: 2,
      name: 'Electronics',
      description: 'This category includes all kinds of electronic products',
    },
    {
      id: 3,
      name: 'Clothing',
      description: 'This category includes all kinds of clothing products',
    },
  ];

  getCategories() {
    return this.categories;
  }

  getCategoryById(id: string) {
    const category = this.categories.find(
      (category) => category.id === parseInt(id),
    );

    if (!category) {
      throw new NotFoundException(`There id no catrgory with ${id} id`);
    }

    return category;
  }

  createCategory(dto: CreateCategoryDto) {
    const { name, description } = dto;

    const newCategory = {
      id: this.categories.length + 1,
      name: name,
      description: description,
    };

    this.categories.push(newCategory);

    return this.categories;
  }

  updateCategory(id: number, dto: UpdateCategoryDto) {
    const { name, description } = dto;
    const category = this.getCategoryById(String(id));

    category.name = name;
    category.description = description;

    return category;
  }

  updateOneProperty(id: number, dto: UpdateCategoryDto) {
    const category = this.getCategoryById(String(id));

    Object.assign(category, dto);

    return category;
  }

  deleteCategory(id: number) {
    const category = this.getCategoryById(String(id));
    this.categories = this.categories.filter((c) => c.id !== category.id);

    return category;
  }
}
