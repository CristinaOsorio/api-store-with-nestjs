import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private productService: ProductsService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(`User #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  create(payload: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(payload);
    return this.userRepository.save(user);
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(`User #${id} not found.`, HttpStatus.NOT_FOUND);
    }

    this.userRepository.merge(user, payload);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userRepository.delete(id);
  }

  // async getOrderByUser(id: number): Promise<Order> {
  //   const user = this.findOne(id);

  //   return {
  //     date: new Date(),
  //     user,
  //     products: await this.productService.findAll(),
  //   };
  // }
}
