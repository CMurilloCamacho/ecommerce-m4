import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderdto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //aplicar el Guardian en  GET/orders/:id
  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
  @Get(':orderId')
  @ApiResponse({status: 404, description: 'Orden no encontrada'})
  
  getOrder(@Param('orderId') orderId: string) {
    return this.ordersService.getOrder(orderId);
  }

  @ApiBearerAuth()
  @ApiResponse({status: 401, description: 'No autorizado, consulta tu token de  autorizacion'})

  @Post()
  @UseGuards(AuthGuard)
  createOrder(@Body() createOrder: CreateOrderdto) {
    const { userId, products } = createOrder;
    return this.ordersService.addOrder(userId, products);
  }
}
