import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [OrdersModule, ProductsModule, UsersModule, AuthModule, ConfigModule.forRoot({
    isGlobal : true,
    load : [typeorm]
  }),
     TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) =>config.get('typeorm')

  }),
     CategoriesModule,
     OrdersModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
