import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetails } from 'src/order_details/entity/order_details.entity';
import { Product } from 'src/products/entity/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}

  async getAllOrders() {
    return await this.orderRepository.find();
  }

  async createOrder(dto: CreateOrderDto) {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.save(Order, dto);

      await manager.save(OrderDetails, {
        order,
        product: { id: dto.product_id },
        quantity: dto.quantity,
      });

      await manager.decrement(
        Product,
        { id: dto.product_id },
        'stock',
        dto.quantity,
      );

      return order;
    });
  }
}
