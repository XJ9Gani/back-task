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
  @IsString({
    message: 'Must be string',
  })
  @IsNotEmpty({
    message: 'Cannot be empty',
  })
  @ApiProperty({
    example: 'iPhone 15 Pro',
    description: 'Product name',
  })
  name: string;

  @IsString()
  @Length(10, 100, {
    message: 'Length must be between 10 and 100 symbols',
  })
  @ApiProperty({
    example: 'Latest Apple smartphone with A17 Pro chip and titanium body',
    description: 'Product description 10-100 characters',
    minLength: 10,
    maxLength: 100,
  })
  description: string;

  @IsInt()
  @IsPositive({
    message: 'Cannot be less than 0',
  })
  @IsNotEmpty()
  @ApiProperty({
    example: 999,
    description: 'Product price in USD',
    minimum: 1,
  })
  price: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    example: 10,
    description: 'Available stock quantity',
    default: 1,
    minimum: 1,
  })
  stock: number = 1;

  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'Category ID (foreign key)',
  })
  categoryId: number;
}
