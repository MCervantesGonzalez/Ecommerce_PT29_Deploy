import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../orders/orders.repository';
import { CreateOrderDto } from '../orders/dtos/orders.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }

  addOrder(newOrderData: CreateOrderDto) {
    return this.ordersRepository.addOrder(newOrderData);
  }
}
