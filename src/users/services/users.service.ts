import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productService: ProductsService,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id).exec();

    if (!user) {
      throw new HttpException(`User #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    const user = new this.userModel(payload);
    return user.save();
  }

  update(id: string, payload: any) {
    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    if (user) {
      return user;
    }

    throw new HttpException(`User #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async getOrderByUser(id: string): Promise<Order> {
    const user = await this.findOne(id);

    return {
      date: new Date(),
      user,
      products: [],
    };
  }
}
