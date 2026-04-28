import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Orders API')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all order transactions',
  })
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get('/details')
  @ApiOperation({
    summary: 'Return order details with additional info',
  })
  getAllOrderDetails() {
    return this.ordersService.getAllOrderDetails();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Returns one order transactions',
  })
  getOneOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOneOrder(id);
  }

  @Get('/details/:id')
  @ApiOperation({
    summary: 'Return one order details with additional info',
  })
  getOneOrderDetails(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOneOrderDetails(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateOrderDto,
    description: 'Order created',
  })
  @ApiOperation({
    summary: 'Create one order',
  })
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: UpdateOrderDto,
    description: 'Order Updates',
  })
  @ApiOperation({
    summary: 'Full updating of one order',
  })
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrder(id, dto);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: UpdateOrderDto,
    description: 'Order Updates',
  })
  @ApiOperation({
    summary: 'Partial updating of one order',
  })
  updateOneProperty(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOneProperty(id, dto);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Order Deleted',
  })
  @ApiOperation({
    summary: 'Delete order',
  })
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.deleteOrder(id);
  }
}
