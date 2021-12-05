import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ProductsModule
  ],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
