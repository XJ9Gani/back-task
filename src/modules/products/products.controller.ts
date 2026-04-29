import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './entity/product.entity';

@ApiTags('Products API')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Returns all categories. Supports searching by name using ?search=your_text',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'iphone',
  })
  @ApiOkResponse({ description: 'List of products returned' })
  getAllProducts(@Query('search') search?: string) {
    return this.productsService.getProducts(search);
  }

  @Get('/excel')
  @ApiOperation({
    summary: 'Exports your products table to excel',
  })
  async getProductsExcel(@Res() res: express.Response) {
    return this.productsService.getProductsExcel(res);
  }
  @Post()
  @ApiCreatedResponse({
    type: CreateProductDto,
    description: 'Product created',
  })
  @ApiOperation({
    summary: 'Create one product',
  })
  creatProduct(@Body() dto: CreateProductDto) {
    return this.productsService.creatProduct(dto);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: Product,
    description: 'Returned product',
  })
  @ApiOperation({
    summary: 'Returns one chosen product. Use id as parameter',
  })
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Full updating one product. Use id as parameter',
  })
  UpdateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, dto);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Partial updating of one product. Use id as parameter',
  })
  updateOneProperty(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<UpdateProductDto>,
  ) {
    return this.productsService.updateOneProperty(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete one product. Use id as parameter',
  })
  DeleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
