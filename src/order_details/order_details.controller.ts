import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Order Details API')
@Controller('order_details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  @ApiOperation({
    summary: 'Return order details with additional info',
  })
  getAllOrderDetails() {
    return this.orderDetailsService.getAllOrderDetails();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Return one order details with additional info',
  })
  getOneOrderDetails(@Param('id', ParseIntPipe) id: number) {
    return this.orderDetailsService.getOneOrderDetails(id);
  }
}
