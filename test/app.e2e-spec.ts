import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { get } from 'http';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Generamos token con login de prueba
    const loginRes = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'Miguel@mail.com', password: 'Miguel123!' });

    // console.log(loginRes.body); //verificamos que nos devuelven

    token = loginRes.body.token; //Guardamos el token devuelto
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Get /users Debe retornar un array de users', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /users/id Debe retornar un usuario por su ID', async () => {
    const req = await request(app.getHttpServer())
      .get('/users/2845eaf2-1fbd-4500-a931-367b4aa71a0f')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Get /products Debe retornar un array de products', async () => {
    //* Supertest prueba el back sin necesidad de que este corriendo:
    const req = await request(app.getHttpServer()).get('/products');

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /products/id Debe retornar un producto por su ID', async () => {
    const req = await request(app.getHttpServer())
      .get('/products/d165761b-1eb6-403f-a8d7-f1b064685a05')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Get /categories Debe retornar un array de categorias', async () => {
    const req = await request(app.getHttpServer()).get('/categories');

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});
