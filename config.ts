import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  postgres: {
    db: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.PGADMIN_PORT),
  },
}));
