"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const environment_1 = require("./config/environment");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce Pt29')
        .setDescription('API REST para gestionar usuarios, productos, órdenes y categorias en un sistema de e-commerce.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    const HOST = environment_1.environment.HOST;
    const PORT = environment_1.environment.PORT;
    await app.listen(PORT);
    console.log(`Servidor escuchando en http://${HOST}:${PORT}/`);
}
bootstrap();
//# sourceMappingURL=main.js.map