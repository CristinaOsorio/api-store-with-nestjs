import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { Order } from '../entities/order.entity';
import { MongoIdPipe } from '@pipes/mongo-id/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  @HttpCode(HttpStatus.OK)
  async getOrders(@Param('id', MongoIdPipe) id: string) {
    return await this.usersService.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
