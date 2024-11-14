import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private orderDetails: Repository<OrderDetails>,
  ) {}

  async createOrder(userId: string, products: any) {
    let total = 0;

    const user = await this.usersRepository.findOneBy({ id: userId });

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });

        if(product.stock = 0) return "No hay productos"

        total += Number(product.price);

        await this.productsRepository.update({id:element.id},
          {stock: product.stock -1}
        )



        return product;
      }),
    );
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.orderDetails.save(orderDetail);
    return await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
  }
}
