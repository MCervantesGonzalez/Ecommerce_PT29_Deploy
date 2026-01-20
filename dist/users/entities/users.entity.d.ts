import { Orders } from '../../orders/entities/orders.entity';
export declare class Users {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    isAdmin: boolean;
    isTester: boolean;
    isDeleted: boolean;
    orders: Orders[];
}
