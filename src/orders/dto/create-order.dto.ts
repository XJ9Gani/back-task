import { IsString, IsNumber, IsPositive, isString } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateOrderDto {
  @CreateDateColumn()
  date: string;

  @IsNumber()
  discount: number;

  @IsString()
  customer_name: string;

  @IsString()
  status: string;

  @IsNumber()
  product_id: number;

  @IsPositive()
  quantity: number = 1;
}
