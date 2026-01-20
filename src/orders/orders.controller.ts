import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../orders/dtos/orders.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Busca una orden por su UUID.' })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden a buscar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Orden encontrada correctamente',
    content: {
      'application/json': {
        example: {
          id: '46785d7b-6b70-4e70-ae1c-5312c60cf8c4',
          date: '2026-01-14T04:07:39.941Z',
          orderDetails: {
            id: '9dced0b5-0f31-4f88-acb4-9f24cdc40d97',
            price: 599.99,
            products: {
              id: '9e9d28e3-ca60-4073-9297-2297dd7f8252',
              name: 'NVIDIA GeForce RTX 4070',
              description: 'High-end graphics card for gaming and ray tracing',
              price: 599.99,
              stock: 6,
              imgUrl:
                'https://pngtree.com/freepng/illustration-of-a-flat-vector-icon-set-featuring-a-camera-symbol-and-a-placeholder-image-icon-vector_12324408.html',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'El UUID proporcionado no es válido',
    content: {
      'application/json': {
        example: { error: 'Formato de UUID inválido' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o ausente',
    content: {
      'application/json': {
        example: { error: 'Token inválido' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'La orden no fue encontrada',
    content: {
      'application/json': {
        example: { error: 'Orden con el UUID especificado no existe' },
      },
    },
  })
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrderById(id);
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Ruta para crear una orden.' })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Datos necesarios para crear una orden',
  })
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Orden creada exitosamente',
    content: {
      'application/json': {
        example: {
          id: '8bc110ea-da76-4b6f-ad62-db70cfd3f0d3',
          date: '2026-01-14T04:59:12.469Z',
          orderDetails: {
            id: '762c373b-f77b-4a2f-9d80-55e3fde55198',
            price: 349.99,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para crear la orden',
    content: {
      'application/json': {
        example: { error: 'El campo products no puede estar vacío' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o ausente',
    content: {
      'application/json': {
        example: {
          error: 'El Token es inválido o ausente',
        },
      },
    },
  })
  addOrder(@Body() newOrderData: CreateOrderDto) {
    return this.ordersService.addOrder(newOrderData);
  }
}
