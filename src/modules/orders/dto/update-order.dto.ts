import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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
    example: 'Paid',
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
  @IsPositive()
  quantity: number = 1;
}
