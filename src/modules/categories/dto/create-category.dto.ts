import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  name: string;

  @IsString()
  @Length(10, 100, {
    message: 'Length must be between 10 and 100 symbols',
  })
  @ApiProperty({
    description: 'Description contains minimum 10 and maximum 100 symbols',
  })
  description: string;
}
