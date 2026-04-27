import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  date: string;

  @IsNumber()
  discount: number;

  @IsNumber()
  customer_name: string;

  @IsString()
  status: string;
}
