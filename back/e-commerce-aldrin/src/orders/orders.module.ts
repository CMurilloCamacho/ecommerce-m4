import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from 'src/entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([OrderDetails]),
    TypeOrmModule.forFeature([Users])
  
  ],

  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
