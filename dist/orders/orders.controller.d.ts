import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../orders/dtos/orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrderById(id: string): Promise<string | import("./entities/orders.entity").Orders>;
    addOrder(newOrderData: CreateOrderDto): Promise<import("./entities/orders.entity").Orders[]>;
}
