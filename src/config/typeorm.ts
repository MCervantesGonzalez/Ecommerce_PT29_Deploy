import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

export default registerAs('typeorm', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: isProduction ? { rejectUnauthorized: false } : false,

  extra: isProduction
    ? {
        ssl: { rejectUnauthorized: false },
      }
    : {},

  autoLoadEntities: true,
  synchronize: !isProduction,
  logging: !isProduction,
}));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],

  ssl: isProduction ? { rejectUnauthorized: false } : false,
  extra: isProduction
    ? {
        ssl: { rejectUnauthorized: false },
      }
    : {},
});
