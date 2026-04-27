import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetails } from 'src/order_details/entity/order_details.entity';
import { Product } from 'src/products/entity/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async getOneOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
    });

    if (!order) throw new NotFoundException();

    return order;
  }

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.save(Order, {
        ...dto,
        date: String(new Date()),
      });

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

  async updateOrder(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.getOneOrder(id);

    Object.assign(order, dto);

    return await this.orderRepository.save(order);
  }

  async updateOneProperty(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.getOneOrder(id);

    Object.assign(order, dto);

    return this.orderRepository.save(order);
  }

  async deleteOrder(id: number): Promise<Order> {
    const order = await this.getOneOrder(id);

    return await this.orderRepository.remove(order);
  }
}
