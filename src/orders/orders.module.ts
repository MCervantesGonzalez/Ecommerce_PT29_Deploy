import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from '../orders/orders.controller';
import { OrdersService } from '../orders/orders.service';
import { OrdersRepository } from '../orders/orders.repository';
import { Orders } from '../orders/entities/orders.entity';
import { OrderDetails } from '../orders/entities/orderdetails.entity';
import { Users } from '../users/entities/users.entity';
import { Products } from '../products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
