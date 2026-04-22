import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-ptoduct.dto';
import express from 'express';
import * as ExcelJS from 'exceljs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(@Query('search') search?: string) {
    return this.productsService.getProducts(search);
  }

  @Get('/excel')
  async getProductsExcel(@Res() res: express.Response) {
    const data = await this.productsService.getProducts();
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

  @Post()
  creatProduct(@Body() dto: CreateProductDto) {
    return this.productsService.creatProduct(dto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(+id);
  }

  @Put('/:id')
  UpdateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete('/:id')
  DeleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
