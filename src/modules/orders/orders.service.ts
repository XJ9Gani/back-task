import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetails } from 'src/modules/orders/entities/order_details.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Transactional } from 'typeorm-transactional';
import { Product } from '../products/entity/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async getAllOrderDetails() {
    return await this.orderDetailsRepository.find({
      relations: ['order', 'product'],
    });
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

  @Transactional()
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const orderEntity = this.orderRepository.create(dto);
    const order = await this.orderRepository.save(orderEntity);
    const product = await this.productRepository.findOne({
      where: { id: dto.product_id },
      select: ['id', 'stock'],
    });

    if (product && dto.quantity > product?.stock)
      throw new BadRequestException('Not enought in stock');

    const details = {
      order,
      product: { id: product?.id },
      quantity: dto.quantity,
    };

    await this.productRepository.decrement(
      { id: product?.id },
      'stock',
      dto.quantity,
    );
    await this.orderDetailsRepository.save(details);

    return order;
  }

  @Transactional()
  async updateOrder(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.getOneOrder(id);

    Object.assign(order, dto);

    return await this.orderRepository.save(order);
  }

  @Transactional()
  async updateOneProperty(
    id: number,
    dto: Partial<UpdateOrderDto>,
  ): Promise<Order> {
    const order = await this.getOneOrder(id);

    Object.assign(order, dto);

    return this.orderRepository.save(order);
  }

  @Transactional()
  async deleteOrder(id: number): Promise<Order> {
    const order = await this.getOneOrder(id);

    return await this.orderRepository.remove(order);
  }
}
