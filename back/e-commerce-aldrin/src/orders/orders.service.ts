import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async addOrder(userId: string, products: any) {
    if (typeof products === 'string') products = [products];
    if (!Array.isArray(products) || products.length === 0) {
      throw new BadRequestException(
        'El carrito de productos debe contener al menos un producto',
      );
    }

    let total = 0;
    const productsArray = [];

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`No se ha encontrado el usuario con userId: ${userId}`);
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;


    for (const prod of products) {
      const product = await this.productsRepository.findOne({
        where: { id: prod.id },
      });

      if (!product) {
        throw new NotFoundException(`El producto con ese ID:  no existe.`);
      }
      if (product.stock <= 0) {
        throw new BadRequestException(
          `El producto  no tiene stock disponible.`,
        );
      }

      await this.productsRepository.update(
        { id: product.id },
        { stock: product.stock - 1 },
      );

      total += Number(product.price);
      productsArray.push(product);
    }

    const newOrder = await this.ordersRepository.save(order);   



    const orderDetail = new OrderDetails();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetails.save(orderDetail);

    return await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: ['orderDetails'],
    });
  }


  async getOrder(orderId: string) {
    const order = await this.ordersRepository.findOne({
      where: {
        id: orderId,
      },

      relations: ['orderDetails', 'orderDetails.products'],
    });
    if (!order)
      throw new NotFoundException(
        `No se encontró una orden con el ID: ${orderId}`,
      );

    return order;
  }
}
