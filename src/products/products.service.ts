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
      name: 'Iphone 16',
      description: 'New Iphone 16',
      price: 20000,
      category: 'Electronics',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
    {
      id: 3,
      name: 'Socks',
      description: 'Two items here',
      price: 300,
      category: 'Clothing',
      createdAt: new Date(),
      updatedAt: '',
      deletedAt: '',
    },
  ];

  getProducts() {
    return this.products;
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
