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
  name: string;

  @IsString()
  @Length(10, 100, {
    message: 'Length must be between 10 and 100 symbols',
  })
  description: string;

  @IsInt()
  @IsPositive({
    message: 'Cannot be less than 0',
  })
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsPositive()
  stock: number = 1;

  @IsNumber()
  categoryId: number;
}
