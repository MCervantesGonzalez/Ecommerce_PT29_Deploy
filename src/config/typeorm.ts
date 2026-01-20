import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

export default registerAs('typeorm', () =>
  isProduction
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      },
);

export const AppDataSource = new DataSource(
  isProduction
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
      },
);
