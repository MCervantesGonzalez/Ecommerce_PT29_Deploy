import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from '../entities/orders.entity';
import { Products } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERDETAILS',
})
export class OrderDetails {
  @ApiProperty({
    description: 'UUID v4 generado por la BD',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Precio total del detalle (decimal con 2 dígitos)',
    example: '4999.99',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ApiProperty({
    description: 'Orden asociada a este detalle',
    type: () => Orders,
  })
  // Orders 1:1 OrderDetails
  @OneToOne(() => Orders, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ApiProperty({
    description: 'Productos asociados a este detalle de orden',
    type: () => [Products],
  })
  // OrderDetails N:N Products
  @ManyToMany(() => Products)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
    joinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];
}
