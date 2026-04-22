import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ProductsModule, CategoriesModule, FileModule],
})
export class AppModule {}
