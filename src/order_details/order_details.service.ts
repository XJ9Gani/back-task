import { Injectable, NotFoundException } from '@nestjs/common';
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
      relations: ['order', 'product'],
    });
  }
  async getOneOrderDetails(id: number) {
    const order_details = await this.orderDetailsRepository.findOne({
      relations: ['order', 'product'],
      where: {
        id,
      },
    });

    if (!order_details) throw new NotFoundException();

    return order_details;
  }
}
