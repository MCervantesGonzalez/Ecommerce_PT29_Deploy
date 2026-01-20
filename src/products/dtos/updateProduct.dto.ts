import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
export class UpdateProductDto {
  @ApiProperty({
    example:
      'Lightweight gaming mouse with high-precision optical sensor and ambidextrous design',
    description: 'Descripcion del producto',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 49.99,
    description: 'Precio del producto',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: 12,
    description: 'Cantidad disponible en stock',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}
