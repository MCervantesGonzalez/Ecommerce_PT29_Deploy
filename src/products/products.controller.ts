import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Products } from './entities/products.entity'; // Refactorizamos y ahora usamos el DTO de updateProduct.
import { ProductsService } from '../products/products.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numero de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Productos por página',
  })
  @Get()
  @ApiOperation({ summary: 'Recibe un array con todos los productos.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente',
    content: {
      'application/json': {
        example: [
          {
            id: '10c9fff0-a80e-4d75-ac5e-9665b2225710',
            name: 'Samsung Odyssey G9',
            description:
              '49-inch ultra-wide curved gaming monitor with high refresh rate and immersive aspect ratio',
            price: '299.99',
            stock: 12,
            imgUrl: 'https://example.com/product-image.png',
            category: {
              id: '00015214-110e-4b43-83e6-e1f1b27903b6',
              name: 'monitor',
            },
          },
          {
            id: '1b4a762b-a460-47da-9cc8-09ebe5660faf',
            name: 'G.Skill Trident Z RGB 16GB DDR4',
            description: 'Reliable DDR4 RAM with RGB lighting',
            price: '89.99',
            stock: 20,
            imgUrl: 'https://example.com/product-image.png',
            category: {
              id: '302aee25-c76b-4365-a583-64d504937454',
              name: 'ram',
            },
          },
        ],
      },
    },
  })
  getAllProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.productsService.getAllProducts(Number(page), Number(limit));
    return this.productsService.getAllProducts(Number(1), Number(5));
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Ruta para precargar productos a la BD.' })
  @ApiResponse({
    status: 201,
    description: 'Productos precargados correctamente',
    content: {
      'application/json': {
        example: { message: 'Productos insertados en la base de datos.' },
      },
    },
  })
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca un producto por su UUID.' })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a buscar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado correctamente',
    content: {
      'application/json': {
        example: {
          id: '10c9fff0-a80e-4d75-ac5e-9665b2225710',
          name: 'Samsung Odyssey G9',
          description:
            '49-inch ultra-wide curved gaming monitor with high refresh rate and immersive aspect ratio',
          price: '299.99',
          stock: 12,
          imgUrl: 'https://example.com/product-image.png',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos buscar el producto',
    content: {
      'application/json': {
        example: {
          error: 'UUID inválido o faltante.',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
    content: {
      'application/json': {
        example: { error: 'No se encontró el producto con id especificado.' },
      },
    },
  })
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Busca un producto por su UUID y actualiza sus campos.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a modificar',
    type: String,
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Datos necesarios para modificar producto.',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente',
    content: {
      'application/json': {
        example: {
          id: '97b31c4c-3c64-453b-ac6d-caf215d9ba25',
          name: 'Motorola Edge 40',
          description:
            'Mid-range smartphone whit OLED display, fast charging and clean Android experience',
          price: '179.78',
          stock: 12,
          imgUrl: 'https://example.com/product-image.png',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para actualizar el producto',
    content: {
      'application/json': {
        example: { error: 'Ingresa datos válidos para actualizar.' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o faltante',
    content: {
      'application/json': {
        example: { error: 'Token inválido' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
    content: {
      'application/json': {
        example: { error: 'No se encontró el producto con id especificado.' },
      },
    },
  })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newProductData: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, newProductData);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Busca un producto por su UUID y lo elimina.' })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a eliminar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado correctamente',
    content: {
      'application/json': {
        example: {
          message: 'Usuario eliminado con éxito.',
          id: '...',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'UUID de producto inválido',
    content: {
      'application/json': {
        example: { error: 'El UUID del producto es inválido o faltante.' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o faltante',
    content: {
      'application/json': {
        example: { error: 'Token inválido' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
    content: {
      'application/json': {
        example: { error: 'No se encontró el producto con id especificado.' },
      },
    },
  })
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
