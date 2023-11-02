import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '@pipes/mongo-id/mongo-id.pipe';
import { Order } from './../entities/order.entity';
import {
  AddProductsToOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dtos/orders.dto';
import { OrdersService } from '../services/orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string): Promise<Order> {
    return this.ordersService.delete(id);
  }

  @Put(':id/products')
  updateProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProductsToOrderDto,
  ): Promise<Order> {
    return this.ordersService.updateProducts(id, payload.products);
  }

  @Delete(':id/products/:productId')
  deleteProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ): Promise<Order> {
    return this.ordersService.deleteProduct(id, productId);
  }
}
