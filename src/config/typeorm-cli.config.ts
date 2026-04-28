import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { InitialSchema1776932874525 } from 'src/migrations/1776932874525-initial-schema';
import { Category } from 'src/modules/categories/entity/category.entity';
import { Product } from 'src/modules/products/entity/product.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: 'postgres',
  entities: [Product, Category],
  migrations: [InitialSchema1776932874525],
});
