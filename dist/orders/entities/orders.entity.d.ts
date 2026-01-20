import { OrderDetails } from '../entities/orderdetails.entity';
import { Users } from '../../users/entities/users.entity';
export declare class Orders {
    id: string;
    date: Date;
    orderDetails: OrderDetails;
    user: Users;
}
