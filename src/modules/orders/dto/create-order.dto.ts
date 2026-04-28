import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty({
    description: 'Available discount in percent',
    example: 15,
  })
  discount: number;

  @IsString()
  customer_name: string;

  @IsString()
  @ApiProperty({
    example: 'Pending',
  })
  status: string;

  @IsNumber()
  product_id: number;

  @IsPositive()
  quantity: number = 1;
}
