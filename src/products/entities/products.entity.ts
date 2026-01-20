import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../orders/entities/orderdetails.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  @ApiProperty({
    description: 'UUID v4 generado por la BD',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre único del producto (máx. 50 caracteres)',
    example: 'Razer Viper',
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example:
      'Lightweight gaming mouse with high-precision optical sensor and ambidextrous design',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @ApiProperty({
    description: 'Precio del producto (decimal con 2 dígitos)',
    example: '49.99',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en stock',
    example: 12,
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/product-image.png',
  })
  @Column({
    type: 'text',
    default: 'https://example.com/product-image.png',
  })
  imgUrl: string;

  @ApiHideProperty()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  //Products N:1 Categories
  @ManyToOne(() => Categories, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  //Products N:N OrderDetails
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
