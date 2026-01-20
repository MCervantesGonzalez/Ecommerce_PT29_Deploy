import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Recibe un array con todas las categorias.' })
  @ApiResponse({
    status: 200,
    description: 'Array de categorías obtenido correctamente',
    content: {
      'application/json': {
        example: [
          {
            id: '00015214-110e-4b43-83e6-e1f1b27903b6',
            name: 'monitor',
          },
          {
            id: '44fce626-261b-41b9-8672-40692139b038',
            name: 'motherboard',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron categorías en la base de datos',
    content: {
      'application/json': {
        example: { error: 'No existen categorías registradas' },
      },
    },
  })
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Ruta para precargar categorias a la BD.' })
  @ApiResponse({
    status: 201,
    description: 'Categorias precargadas exitosamente',
    content: {
      'application/json': {
        example: {
          message: 'Categorias insertadas correctamente',
          categories: [
            {
              id: '00015214-110e-4b43-83e6-e1f1b27903b6',
              name: 'monitor',
            },
            {
              id: '44fce626-261b-41b9-8672-40692139b038',
              name: 'motherboard',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al intentar precargar categorías',
    content: {
      'application/json': {
        example: { error: 'Las categorías ya existen en la base de datos' },
      },
    },
  })
  addCategories() {
    return this.categoriesService.addCategories();
  }
}
