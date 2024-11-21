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

  async addOrder(userId: string, products: any) {
    if(typeof products === 'string') products = [products]
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error(
        'El carrito de productos debe contener al menos un producto',
      );
    }
  
    let total = 0;
    const productsArray = [];
  
    // Verificar usuario
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`No se ha encontrado el usuario con userId: ${userId}`);
    }
  
    // Crear orden inicial
    const order = new Orders();
    order.date = new Date();
    order.user = user;
  
    const newOrder = await this.ordersRepository.save(order);
  
    // Procesar productos
    for (const productId of products) {
      const product = await this.productsRepository.findOneBy({
        id: productId,
      });
  
      if (!product) {
        throw new Error(`El producto con ID: ${productId} no existe.`);
      }
      if (product.stock <= 0) {
        throw new Error(`El producto con ID: ${productId} no tiene stock disponible.`);
      }
  
      // Reducir stock del producto
      await this.productsRepository.update(
        { id: product.id },
        { stock: product.stock - 1 },
      );
  
      total += Number(product.price);
      productsArray.push(product);
    }
  
    // Crear detalle de la orden
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
  
    await this.orderDetails.save(orderDetail);
  
    // Devolver la orden con relaciones
    return await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
  }

  async getOrders(orderId: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: {
        orderDetails: {
          products: true,
        },
        user: true,
      },
    });
    if (!order) {
      throw new Error(`No se encontró una orden con el ID: ${orderId}`);
    }
    const response = {
      userId: order.user.id,
      products: order.orderDetails.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
      })),
    };
    return response;
  }

  async getOrder(orderId: string) {
    const order = await this.ordersRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        orderDetails: {
          products: true,
        },
        user: true,
      },
    });
    if (!order)
      throw new Error(`No se encontró una orden con el ID: ${orderId}`);
    const response = {
      orderId: order.id,
      date: order.date,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
      orderDetails: {
        price: order.orderDetails.price,
        products: order.orderDetails.products.map((product) => ({
          id: product.id,
          name: product.name,
          stock: product.stock,
          imgUrl: product.imgUrl,
        })),
      },
    };
    return response;
  }
}
