import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from '../../orders/entities/orders.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'USERS' })
export class Users {
  @ApiProperty({
    description: 'UUID v4 generado por la BD',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del usuario (máx. 50 caracteres)',
    example: 'Miguel Cervantes',
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico único (máx. 50 caracteres)',
    example: 'miguel@mail.com',
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @ApiHideProperty()
  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @ApiProperty({ description: 'Teléfono del usuario', example: '3336612227' })
  @Column({ type: 'int' })
  phone: number;

  @ApiProperty({ description: 'País del usuario', example: 'México' })
  @Column({ type: 'varchar', length: 50 })
  country: string;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Av. Patria 123',
  })
  @Column({ type: 'text' })
  address: string;

  @ApiProperty({ description: 'Ciudad del usuario', example: 'Guadalajara' })
  @Column({ type: 'varchar', length: 50 })
  city: string;

  @ApiHideProperty()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @ApiHideProperty()
  @Column({ type: 'boolean', default: false })
  isTester: boolean;

  @ApiHideProperty()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  // Users 1:N Orders
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
