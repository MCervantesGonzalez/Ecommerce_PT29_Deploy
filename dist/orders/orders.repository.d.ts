import { Repository } from 'typeorm';
import { OrderDetails } from '../orders/entities/orderdetails.entity';
import { Orders } from '../orders/entities/orders.entity';
import { Products } from '../products/entities/products.entity';
import { Users } from '../users/entities/users.entity';
import { CreateOrderDto } from '../orders/dtos/orders.dto';
export declare class OrdersRepository {
    private ordersRepository;
    private orderDetailRepository;
    private usersRepository;
    private productsRepository;
    constructor(ordersRepository: Repository<Orders>, orderDetailRepository: Repository<OrderDetails>, usersRepository: Repository<Users>, productsRepository: Repository<Products>);
    getOrderById(id: string): Promise<Orders | string>;
    addOrder(newOrderData: CreateOrderDto): Promise<Orders[]>;
}
