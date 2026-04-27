import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrdersService],
})
export class OrdersModule {}
