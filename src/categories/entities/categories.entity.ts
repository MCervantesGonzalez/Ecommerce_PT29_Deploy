import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {
  @ApiProperty({
    description: 'UUID v4 generado por la BD.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:
      'Nombre de la categoría (máx. 50 caracteres, no puede ser null).',
    example: 'Electrónica',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: 'Lista de productos asociados a esta categoría',
    type: () => [Products],
  })
  //Categories 1:N Products
  @OneToMany(() => Products, (product) => product.category)
  product: Products[];
}
