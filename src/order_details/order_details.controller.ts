import { Controller, Get } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';

@Controller('order_details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  getAllOrderDetails() {
    return this.orderDetailsService.getAllOrderDetails();
  }
}
