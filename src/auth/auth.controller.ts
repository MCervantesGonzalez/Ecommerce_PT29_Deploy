import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto, LoginUserDto } from '../users/dtos/users.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Ruta que devuelve un string.' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Ruta de prueba, devuelve un string',
    content: {
      'application/json': {
        example: { message: 'Auth service is running' },
      },
    },
  })
  getAuth(): string {
    return this.authService.getAuth();
  }

  @ApiOperation({
    summary: 'Ruta para iniciar sesion ingresando correo y contraseña.',
  })
  @Post('signin')
  @ApiBody({
    type: LoginUserDto,
    description: 'Credenciales de acceso (email y password)',
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    content: {
      'application/json': {
        example: {
          message: 'Login Correcto',
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YzFkZDM3LWQ0YWItNGI0YS1hMDQ1LTJjZDNkZWNmNmEzZiIsImVtYWlsIjoiRGVtb1VzZXIwMUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzVGVzdGVyIjpmYWxzZSwiaWF0IjoxNzY4MzY4ODcyLCJleHAiOjE3NjgzNzI0NzJ9.35ylAEjW3rONHuUq1JcAKv3JNMYghZ16KaEVnXiFxwQ',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Credenciales inválidas',
    content: {
      'application/json': {
        example: { error: 'Credenciales de inicio de sesion incorrectas' },
      },
    },
  })
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @ApiOperation({ summary: 'Ruta para crear nuevo usuario.' })
  @Post('signup')
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos necesarios para registrar un nuevo usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    content: {
      'application/json': {
        example: {
          id: 'fd89e699-d217-435a-b889-6db66a5e75ff',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para crear nuevo usuario',
    content: {
      'application/json': {
        example: { error: 'El email ya está registrado' },
      },
    },
  })
  signUp(@Body() newUserData: CreateUserDto) {
    return this.authService.singUp(newUserData);
  }
}
