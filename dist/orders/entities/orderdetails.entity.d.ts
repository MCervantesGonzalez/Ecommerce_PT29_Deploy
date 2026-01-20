import { Orders } from '../entities/orders.entity';
import { Products } from '../../products/entities/products.entity';
export declare class OrderDetails {
    id: string;
    price: number;
    order: Orders;
    products: Products[];
}
