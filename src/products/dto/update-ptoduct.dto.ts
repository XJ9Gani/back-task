import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdateProductDto {
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
  categoryId: number;
}
