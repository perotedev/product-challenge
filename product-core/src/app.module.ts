import { ProductModule } from './products/product.module';
import { ProductsController } from './products/products.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'product_challenge',
      entities: [],
      synchronize: true,
    }),
    ProductModule,],
  controllers: [
    ProductsController, AppController],
  providers: [AppService],
})
export class AppModule { }
