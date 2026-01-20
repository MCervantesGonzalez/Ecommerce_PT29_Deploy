# E-commerce API con NESTJS

API REST (REPRESENTATIONAL STATE TRANSFER) para gestionar productos, usuarios, órdenes y categorias en un sistema de e-commerce.
Construida con **NestJS**, **TypeORM**, **PostgreSQL** y documentada con **Swagger**.

## Tabla de Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)

## Características

- Registro de Usuario e ingreso mediante correo electrónico y contraseña.
- Autenticación con JWT (JSON WEB TOKEN).
- Gestión de usuarios y roles (Admin/Tester/User).
- CRUD (CREATE, READ, UPDATE, DELETE) de usuarios y productos con borrado lógico.
- Órdenes con detalles y cálculo automático del total.
- Conexión con Cloudinary para la gestión de imágenes en la nube.
- Documentación con Swagger y Open API.
- Testing con Jest.

## Tecnologías

- [NestJS](https://nestjs.com/) Framework principal.
- [TypeORM](https://typeorm.io/) ORM para PostgreSQL.
- [PostgreSQL](https://postgresql.org/) Base de datos relacional.
- [Swagger](https://swagger.io/) Documentación de la API.
- [JWT](https://jwt.io/) Autenticación.
- [JEST](https://jestjs.io/) Testing.

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/tu-repositorio.git

# Entrar al proyecto
cd tu-repositorio

# Instalar dependencias
npm install
```

## Configuración

```markdown
# Crea un archivo `.env.development` con las siguientes variables:

INFO PARA LEVANTAR EL PROYECTO
HOST =localhost
PORT=3000

INFO DE BASE DE DATOS
DB_NAME=nombre_base_de_datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ingresar_nombre_de_usuario
DB_PASSWORD=ingresar_contraseña

INFO DE CLOUDINARY
CLOUDINARY_CLOUD_NAME=nombre_del_cloud
CLOUDINARY_API_KEY=ingresar_key_del_cloud
CLOUDINARY_API_SECRET=ingresar_secret_del_cloud

INFO DE JWT
JWT_SECRET=ingresar_JWT_secret_word

INFO PARA DB EN CASO DE USAR DOCKER
POSTGRES_PASSWORD =ingresar_contraseña
POSTGRES_DB =nombre_base_de_datos
```

## Uso

```bash
# Levantar el servidor en desarrollo
npm run start:dev
```

#### La API estara disponible en:

http://localhost:3000/api#/
