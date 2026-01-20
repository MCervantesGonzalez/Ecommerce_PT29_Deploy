import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload/file-upload.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiBearerAuth()
  @Put('uploadImage/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Modifica la imagen predefinida de un producto.' })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a modificar',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta genérica en caso de éxito',
    content: {
      'application/json': {
        example: {
          message: 'OK',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'La imagen se subio de forma correcta',
    content: {
      'application/json': {
        example: {
          id: '2e67fe74-4297-4bb7-8064-f8f91e888e06',
          name: 'Razer Viper',
          description: 'Descripcion De Prueba',
          price: 99.99,
          stock: 10,
          imgUrl:
            'https://res.cloudinary.com/db5lump8y/image/upload/v1768443036/lw0nvv0ywphtqd3u0d6g.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Errores de validación al cargar la imagen',
    content: {
      'application/json': {
        examples: {
          maxSize: {
            summary: 'Archivo demasiado grande',
            value: { error: 'Supera el peso máximo de 200kb' },
          },
          invalidType: {
            summary: 'Formato no permitido',
            value: {
              error:
                'Formato de imagen no válido, solo se permiten jpg, jpeg, webp, gif, png, svg',
            },
          },
          missingFile: {
            summary: 'Campo file ausente',
            value: { error: 'El campo file es requerido' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token Inválido',
    content: {
      'application/json': {
        example: {
          error: 'El Token es inválido o ausente',
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Usuario autenticado pero sin rol autorizado',
    content: {
      'application/json': {
        example: {
          error: 'No tienes permisos para modificar este recurso',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'El producto que intentabas actualizar no fue encontrado',
    content: {
      'application/json': {
        example: { error: 'El recurso solicitado no fue encontrado.' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'Supera el peso máximo de 200kb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.webp|.gif|.png|.svg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
