import { registerAs } from '@nestjs/config';

const isProduction = process.env.NODE_ENV === 'production';

export default registerAs('typeorm', () => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
}));
