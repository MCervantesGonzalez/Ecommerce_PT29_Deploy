# E-commerce API con NestJS

API REST para gestionar productos, usuarios, órdenes y categorías en un sistema de e-commerce.
Construida con **NestJS**, **TypeORM**, **PostgreSQL** y documentada con **Swagger**.

## Tabla de Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Usuarios de prueba](#usuarios-de-prueba)
- [Uso](#uso)

---

## Características

- Registro de usuario e ingreso mediante correo electrónico y contraseña.
- Autenticación con JWT (JSON Web Token).
- Gestión de usuarios y roles (Admin / Tester / User).
- CRUD completo de usuarios y productos con borrado lógico.
- Órdenes con detalles y cálculo automático del total.
- Conexión con Cloudinary para gestión de imágenes en la nube.
- Documentación interactiva con Swagger / Open API.
- Testing con Jest.

---

## Tecnologías

| Tecnología                            | Descripción              |
| ------------------------------------- | ------------------------ |
| [NestJS](https://nestjs.com/)         | Framework principal      |
| [TypeORM](https://typeorm.io/)        | ORM para PostgreSQL      |
| [PostgreSQL](https://postgresql.org/) | Base de datos relacional |
| [Supabase](https://supabase.com/)     | Hosting de base de datos |
| [Swagger](https://swagger.io/)        | Documentación de la API  |
| [JWT](https://jwt.io/)                | Autenticación            |
| [Jest](https://jestjs.io/)            | Testing                  |
| [Cloudinary](https://cloudinary.com/) | Gestión de imágenes      |

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/tu-repositorio.git

# Entrar al proyecto
cd tu-repositorio

# Instalar dependencias
npm install
```

---

## Configuración

Crea un archivo `.env.development` en la raíz del proyecto con las siguientes variables:

```env
# Servidor
HOST=localhost
PORT=3000

# Base de datos (Supabase)
DATABASE_URL=postgresql://usuario:password@host:5432/postgres

# Cloudinary
CLOUDINARY_CLOUD_NAME=nombre_del_cloud
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret

# JWT
JWT_SECRET=tu_jwt_secret
```

> La variable `DATABASE_URL` se obtiene desde **Supabase → Project Settings → Database → Connection string → Session pooler**.

---

## Usuarios de prueba

La API incluye usuarios precargados para facilitar las pruebas. El password de cada usuario sigue el patrón `AAbb##XX` donde `XX` corresponde al número del usuario.

| Usuario      | Email               | Password   | Rol        |
| ------------ | ------------------- | ---------- | ---------- |
| Demo User 01 | DemoUser01@mail.com | `AAbb##11` | **Admin**  |
| Demo User 02 | DemoUser02@mail.com | `AAbb##22` | **Tester** |
| Demo User 03 | DemoUser03@mail.com | `AAbb##33` | **User**   |

### Permisos por rol

- **Admin** — acceso total: gestión de usuarios, productos, categorías y órdenes.
- **Tester** — acceso de solo lectura a todos los recursos.
- **User** — puede crear órdenes y gestionar su propio perfil.

### ¿Cómo autenticarse en Swagger?

1. Usa el endpoint `POST /auth/signin` con las credenciales del usuario deseado.
2. Copia el token JWT de la respuesta.
3. Click en el botón **Authorize 🔒** en la parte superior de Swagger.
4. Ingresa el token con el formato: `Bearer <token>`

---

## Uso

```bash
# Levantar el servidor en modo desarrollo
npm run start:dev
```

La documentación interactiva estará disponible en:

```
http://localhost:3000/api#/
```
