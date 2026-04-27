import { IsNotEmpty, IsString, Length } from 'class-validator';
export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(10, 100, {
    message: 'Length must be between 10 and 100 symbols',
  })
  description: string;
}
