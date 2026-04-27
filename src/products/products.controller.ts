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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-ptoduct.dto';
import express from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(@Query('search') search?: string) {
    return this.productsService.getProducts(search);
  }

  @Get('/excel')
  async getProductsExcel(@Res() res: express.Response) {
    return this.productsService.getProductsExcel(res);
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

  @Patch('/:id')
  updateOneProperty(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.updateOneProperty(id, dto);
  }

  @Delete('/:id')
  DeleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
