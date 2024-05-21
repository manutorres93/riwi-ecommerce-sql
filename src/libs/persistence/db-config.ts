import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => ({
  db: {
    connection: process.env.DB_CONNECTION || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    name: process.env.DB_NAME || 'riwi_shop',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
  },
  env: process.env.NODE_ENV || 'local',
}));
