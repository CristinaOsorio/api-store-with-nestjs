import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsController } from './controllers/products/products.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { ProductsService } from './services/products/products.service';
import { BrandsService } from './services/brands/brands.service';
import { BrandsController } from './controllers/brands/brands.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    BrandsController,
    CategoriesController,
    CustomersController,
    OrdersController,
    ProductsController,
    UsersController,
  ],
  providers: [AppService, BrandsService, ProductsService],
})
export class AppModule {}
