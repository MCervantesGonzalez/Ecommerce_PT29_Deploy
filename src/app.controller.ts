import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Ruta de prueba que devuelve un saludo' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
