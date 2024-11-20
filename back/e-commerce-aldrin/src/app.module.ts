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
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [FileUploadModule, OrdersModule, ProductsModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '1h'}
  }), UsersModule, AuthModule, ConfigModule.forRoot({
    isGlobal : true,
    load : [typeorm]
  }),
     TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) =>config.get('typeorm')

  }),
     CategoriesModule,
     OrdersModule,
     FileUploadModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
