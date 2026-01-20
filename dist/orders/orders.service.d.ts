import { OrdersRepository } from '../orders/orders.repository';
import { CreateOrderDto } from '../orders/dtos/orders.dto';
export declare class OrdersService {
    private ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    getOrderById(id: string): Promise<string | import("./entities/orders.entity").Orders>;
    addOrder(newOrderData: CreateOrderDto): Promise<import("./entities/orders.entity").Orders[]>;
}
