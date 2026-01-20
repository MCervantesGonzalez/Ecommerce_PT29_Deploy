import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from '../orders/entities/orderdetails.entity';
import { Orders } from '../orders/entities/orders.entity';
import { Products } from '../products/entities/products.entity';
import { Users } from '../users/entities/users.entity';
import { CreateOrderDto } from '../orders/dtos/orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async getOrderById(id: string): Promise<Orders | string> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order)
      throw new NotFoundException(`La orden con id ${id} no fue encontrada`);

    return order;
  }

  async addOrder(newOrderData: CreateOrderDto): Promise<Orders[]> {
    const { userId, products } = newOrderData;
    // Primero verificamos que exista el usuario:
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(
        `Usuario con el id ${userId} no fue encontrado`,
      );

    // Segundo creamos la orden:
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ordersRepository.save(order);
    // Asociamos cada "Id" recibido con el "Product":
    const producsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });

        if (!product)
          throw new NotFoundException(
            `El producto con id ${element.id} no fue encontrado`,
          );
        // Actualizamos el stock:
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    // Calculamos el total de forma segura:
    const total = producsArray.reduce(
      (sum, product) => sum + Number(product.price),
      0,
    );

    // Creamos "OrderDetail" y la insertamos en la base de datos:
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = producsArray;
    orderDetail.order = newOrder;
    await this.orderDetailRepository.save(orderDetail);

    // Enviamos al cliente la compra con la info de productos:
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }
}
