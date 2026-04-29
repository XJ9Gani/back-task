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
  @ApiProperty({
    description: 'Customer full name',
    example: 'Marat maratov',
  })
  customer_name: string;

  @IsString()
  @ApiProperty({
    description: 'Order current status',
    example: 'Pending',
    enum: ['Pending', 'Paid', 'Not paid'],
  })
  status: string;

  @IsNumber()
  @ApiProperty({
    description: 'Purchased product id',
    example: 5,
  })
  product_id: number;

  @IsPositive()
  @ApiProperty({
    description: 'Purchased product quantity',
    example: 10,
  })
  quantity: number = 1;
}
