import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderdto } from './create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get()
  getOrders(){}


  @Post()
  createOrder(@Body() createOrder: CreateOrderdto){

    const{userId, products} = createOrder
    return this.ordersService.createOrder(userId, products)
  }
}
