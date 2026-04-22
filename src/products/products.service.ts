import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Like, Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-ptoduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(search?: string): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category'],
      where: search
        ? {
            name: Like(`%${search}%`),
          }
        : {},
    });
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      relations: ['category'],
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  async creatProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      ...dto,
      category: { categoryId: dto.categoryId },
    });

    return await this.productRepository.save(product);
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.getProductById(id);

    Object.assign(product, {
      ...dto,
      category: { categoryId: dto.categoryId },
    });

    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.getProductById(id);

    return await this.productRepository.remove(product);
  }

  // getProducts(search?: string) {
  //   if (!search || search.length === 0) return this.products;

  //   const filteredProducts = this.products.filter((product) => {
  //     return product.name.toLowerCase().includes(search.toLowerCase());
  //   });

  //   return filteredProducts;
  // }
}
