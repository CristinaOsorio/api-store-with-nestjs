import { Module } from '@nestjs/common';

import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from './../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { User, UserShcema } from './entities/user.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: User.name, schema: UserShcema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [CustomersController, UsersController, OrdersController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
