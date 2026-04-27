import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './entity/order_details.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    private dataSource: DataSource,
  ) {}

  async getAllOrderDetails() {
    return await this.orderDetailsRepository.find({
      relations: {
        order: true,
        product: true,
      },
    });
  }
}
