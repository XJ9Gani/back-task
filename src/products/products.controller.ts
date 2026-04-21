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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-ptoduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('search') search?: string) {
    return this.productsService.getProducts(search);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Put('/:id')
  UpdateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  @Patch('/:id')
  UpdateOneProperty(
    @Param('id') id: number,
    @Body() dto: Partial<UpdateProductDto>,
  ) {
    return this.productsService.updateOneProperty(id, dto);
  }

  @Delete('/:id')
  DeleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
