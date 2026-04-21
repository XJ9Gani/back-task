import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-ptoduct.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'Apple',
      description: 'Green Apple',
      price: 100,
      category: 'Food',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 2,
      name: 'Apple Juice',
      description: 'Fresh apple juice',
      price: 150,
      category: 'Food',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 3,
      name: 'Apple Pie',
      description: 'Sweet apple pie',
      price: 200,
      category: 'Food',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 4,
      name: 'Samsung Galaxy S24',
      description: 'Flagship Samsung phone',
      price: 18000,
      category: 'Electronics',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 5,
      name: 'Samsung TV',
      description: 'Smart TV 55 inch',
      price: 25000,
      category: 'Electronics',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 6,
      name: 'Samsung Buds',
      description: 'Wireless earbuds',
      price: 5000,
      category: 'Electronics',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 7,
      name: 'Socks',
      description: 'Basic socks',
      price: 300,
      category: 'Clothing',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 8,
      name: 'Socks Sport',
      description: 'Sport socks',
      price: 400,
      category: 'Clothing',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 9,
      name: 'Socks Winter',
      description: 'Warm winter socks',
      price: 500,
      category: 'Clothing',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 10,
      name: 'Sandwich',
      description: 'Chicken sandwich',
      price: 700,
      category: 'Food',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
  ];

  getProducts(search?: string) {
    if (!search || search.length === 0) return this.products;

    const filteredProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });

    return filteredProducts;
  }

  getProductById(id: string) {
    const product = this.products.find(
      (product) => product.id === parseInt(id),
    );

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  createProduct(dto: CreateProductDto) {
    const { name, description, price, category } = dto;

    const newProduct = {
      id: this.products.length + 1,
      name: name,
      price: price,
      description: description,
      category: category,
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    };

    this.products.push(newProduct);

    return newProduct;
  }

  updateProduct(id: number, dto: UpdateProductDto) {
    const product = this.getProductById(id.toString());

    product.name = dto.name;
    product.price = dto.price;
    product.category = dto.category;
    product.description = dto.description;
    product.updatedAt = String(new Date());

    return product;
  }

  updateOneProperty(id: number, dto: Partial<UpdateProductDto>) {
    const product = this.getProductById(id.toString());

    product.updatedAt = String(new Date());
    Object.assign(product, dto);

    return product;
  }

  deleteProduct(id: number) {
    const product = this.getProductById(id.toString());

    this.products = this.products.filter((p) => p.id !== product.id);
    product.deletedAt = String(new Date());

    return product;
  }
}
