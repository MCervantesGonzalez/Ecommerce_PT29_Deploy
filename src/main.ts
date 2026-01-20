import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { environment } from './config/environment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ecommerce Pt29')
    .setDescription(
      'API REST para gestionar usuarios, productos, órdenes y categorias en un sistema de e-commerce.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const HOST = environment.HOST;
  const PORT = environment.PORT;
  await app.listen(PORT);

  console.log(`Servidor escuchando en http://${HOST}:${PORT}/`);
}
bootstrap();
