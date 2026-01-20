import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

class OrderProductDto {
  @ApiProperty({
    description: 'UUID v4 del producto',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}
export class CreateOrderDto {
  @ApiProperty({
    description: 'UUID v4 del usuario que realiza la orden',
    example: '660e8400-e29b-41d4-a716-446655440111',
  })
  @IsNotEmpty()
  @IsUUID(4, { message: 'ID debe ser un UUID v4' })
  userId: string;

  @ApiProperty({
    description: 'Lista de productos incluidos en la orden (mínimo 1)',
    type: () => [OrderProductDto],
    example: [{ id: '550e8400-e29b-41d4-a716-446655440000' }],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: OrderProductDto[];
}
