import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({
  path: '.env',
});

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}` || 'localhost',
  username: `${process.env.DB_USERNAME}`,
  port: `${parseInt(process.env.DB_PORT)}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migration:['dist/**/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  dropSchema: true,
  synchronize: true,
  retryAttempts: 10,
  retryDelay: 5000,
  
};
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
