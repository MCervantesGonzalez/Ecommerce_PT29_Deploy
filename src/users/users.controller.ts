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
import { UsersService } from '../users/users.service';
import { Users } from '../users/entities/users.entity';
import { UpdateUserDto } from '../users/dtos/users.dto';
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin, Role.Tester)
  @UseGuards(AuthGuard, RolesGuard)
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
    description: 'Usuarios por página',
  })
  @ApiOperation({ summary: 'Recibe un array con todos los usuarios.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente',
    content: {
      'application/json': {
        example: [
          {
            id: '74c1dd37-d4ab-4b4a-a045-2cd3decf6a3f',
            name: 'Demo User 00',
            email: 'DemoUser00@mail.com',
            phone: 1234567890,
            country: 'Demo Country',
            address: 'Demo Street 00',
            city: 'Demo City',
          },
          {
            id: '74c1dd37-d4bb-4b4a-b045-2fd3decf6b3f',
            name: 'Demo User 01',
            email: 'DemoUser01@mail.com',
            phone: 1234567890,
            country: 'Demo Country',
            address: 'Demo Street 01',
            city: 'Demo City',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o faltante',
    content: {
      'application/json': {
        example: {
          error: 'Token inválido',
        },
      },
    },
  })
  async getAllUsers(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Omit<Users, 'password'>[]> {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    return this.usersService.getAllUsers(validPage, validLimit);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Busca a un usuario por su UUID.' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a buscar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado correctamente',
    content: {
      'application/json': {
        example: {
          id: '74c1dd37-d4ab-4b4a-a045-2cd3decf6a3f',
          name: 'Demo User 00',
          email: 'DemoUser00@mail.com',
          phone: 1234567890,
          country: 'Demo Country',
          address: 'Demo Street 00',
          city: 'Demo City',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o faltante',
    content: {
      'application/json': {
        example: {
          error: 'Token inválido',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    content: {
      'application/json': {
        example: {
          error: 'No se encontró el usuario con id especificado.',
        },
      },
    },
  })
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Busca a un usuario por su UUID y actualiza sus campos.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a modificar',
    type: String,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Datos necesarios para modificar usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
    content: {
      'application/json': {
        example: {
          address: 'Demo Street 987',
          phone: 1234567890,
          country: 'Demo Country 987',
          city: 'Demo City 987',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para actualizar el usuario',
    content: {
      'application/json': {
        example: {
          error: 'Ingresa datos validos para actualizar.',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o faltante',
    content: {
      'application/json': {
        example: {
          error: 'Token inválido',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    content: {
      'application/json': {
        example: {
          error: 'No se encontró el usuario con id especificado.',
        },
      },
    },
  })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newUserData: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, newUserData);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Busca a un usuario por su UUID y lo elimina.' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a eliminar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado correctamente',
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
    description: 'UUID de usuario inválido',
    content: {
      'application/json': {
        example: {
          error: 'El UUID del usuario es inválido o faltante.',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o faltante',
    content: {
      'application/json': {
        example: {
          error: 'Token inválido',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    content: {
      'application/json': {
        example: {
          error: 'No se encontró el usuario con id especificado.',
        },
      },
    },
  })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
