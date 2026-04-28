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
  customer_name: string;

  @IsString()
  @ApiProperty({
    example: 'Paid',
  })
  status: string;

  @IsNumber()
  product_id: number;

  @IsPositive()
  quantity: number = 1;
}
