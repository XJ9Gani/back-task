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
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 2,
      name: 'Food Snacks',
      description: 'Snacks and quick bites',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 3,
      name: 'Food Drinks',
      description: 'Beverages and drinks',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 4,
      name: 'Electronics',
      description: 'All kinds of electronic products',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 5,
      name: 'Electronics Mobile',
      description: 'Smartphones and accessories',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 6,
      name: 'Electronics Home',
      description: 'Home electronics like TVs and appliances',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 7,
      name: 'Clothing',
      description: 'All clothing products',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 8,
      name: 'Clothing Men',
      description: 'Men clothing',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 9,
      name: 'Clothing Women',
      description: 'Women clothing',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 10,
      name: 'Clothing Winter',
      description: 'Winter clothes and accessories',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
  ];

  getCategories(search?: string) {
    if (!search) return this.categories;

    const filteredCategories = this.categories.filter((category) => {
      return category.name.toLowerCase().includes(search.toLowerCase());
    });

    return filteredCategories;
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
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    };

    this.categories.push(newCategory);

    return this.categories;
  }

  updateCategory(id: number, dto: UpdateCategoryDto) {
    const { name, description } = dto;
    const category = this.getCategoryById(String(id));

    category.name = name;
    category.description = description;
    category.updatedAt = String(new Date());

    return category;
  }

  updateOneProperty(id: number, dto: UpdateCategoryDto) {
    const category = this.getCategoryById(String(id));

    Object.assign(category, dto);
    category.updatedAt = String(new Date());

    return category;
  }

  deleteCategory(id: number) {
    const category = this.getCategoryById(String(id));
    this.categories = this.categories.filter((c) => c.id !== category.id);
    category.deletedAt = String(new Date());

    return category;
  }
}
