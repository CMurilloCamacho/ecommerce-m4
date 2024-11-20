import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderdto } from './create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  //aplicar el Guardian en  GET/orders/:id
  @Get()
  getOrders(){
    return this.ordersService.getOrders()
  }


  @Post()
  @UseGuards(AuthGuard)

  createOrder(@Body() createOrder: CreateOrderdto){

    const{userId, products} = createOrder
    return this.ordersService.createOrder(userId, products)
  }
}
