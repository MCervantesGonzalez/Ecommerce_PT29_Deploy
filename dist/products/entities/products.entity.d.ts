import { Categories } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../orders/entities/orderdetails.entity';
export declare class Products {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    isDeleted: boolean;
    category: Categories;
    orderDetails: OrderDetails[];
}
