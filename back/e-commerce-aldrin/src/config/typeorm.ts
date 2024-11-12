import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({
  path: '.development.env',
});

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}` || 'localhost',
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migration:['dist/**/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  dropSheme: true,
  synchronize: true,
};
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
