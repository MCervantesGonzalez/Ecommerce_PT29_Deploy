import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from '../entities/orderdetails.entity';
import { Users } from '../../users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @ApiProperty({
    description: 'UUID v4 generado por la BD',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Fecha de la orden en formato dd/mm/yyyy',
    example: '01/01/2026',
    format: 'date',
  })
  @Column()
  date: Date;

  @ApiProperty({
    description: 'Detalles asociados a la orden',
    type: () => OrderDetails,
  })

  // OrderDetails 1:1 Orders
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ApiProperty({
    description: 'Usuario al que se asocia la orden',
    type: () => Users,
  })
  // Orders N:1 Users
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
