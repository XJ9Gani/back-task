import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Like, Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-ptoduct.dto';
import express from 'express';
import * as ExcelJS from 'exceljs';

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

  async updateOneProperty(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.getProductById(id);

    Object.assign(product, dto);

    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.getProductById(id);

    return await this.productRepository.remove(product);
  }

  async getProductsExcel(@Res() res: express.Response) {
    const data = await this.getProducts();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

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
