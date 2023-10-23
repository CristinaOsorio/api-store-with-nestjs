import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* Controllers */
import { BrandsController } from './controllers/brands/brands.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsController } from './controllers/products/products.controller';
import { UsersController } from './controllers/users/users.controller';

/* Services */
import { BrandsService } from './services/brands/brands.service';
import { CategoriesService } from './services/categories/categories.service';
import { CustomersService } from './services/customers/customers.service';
import { ProductsService } from './services/products/products.service';
import { UsersService } from './services/users/users.service';

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
  providers: [
    AppService,
    BrandsService,
    CategoriesService,
    CustomersService,
    ProductsService,
    UsersService,
  ],
})
export class AppModule {}
