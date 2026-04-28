import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsPositive,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'iPhone 15 Pro',
    description: 'Product name',
  })
  @IsString({
    message: 'Must be string',
  })
  @IsNotEmpty({
    message: 'Cannot be empty',
  })
  name: string;

  @ApiProperty({
    example: 'Latest Apple smartphone with A17 Pro chip and titanium body',
    description: 'Product description 10–100 characters',
    minLength: 10,
    maxLength: 100,
  })
  @IsString()
  @Length(10, 100, {
    message: 'Length must be between 10 and 100 symbols',
  })
  description: string;

  @ApiProperty({
    example: 999,
    description: 'Product price in USD',
    minimum: 1,
  })
  @IsInt()
  @IsPositive({
    message: 'Cannot be less than 0',
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Available stock quantity',
    default: 1,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  stock: number = 1;

  @ApiProperty({
    example: 2,
    description: 'Category ID (foreign key)',
  })
  @IsNumber()
  categoryId: number;
}
