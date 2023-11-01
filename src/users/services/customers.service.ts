import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  findOne(id: string) {
    const customer = this.customerModel.findById(id);

    if (!customer) {
      throw new HttpException(
        `Customer #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const customer = new this.customerModel(payload);
    return customer.save();
  }

  update(id: string, payload: UpdateCustomerDto) {
    const customer = this.customerModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (customer) {
      return customer;
    }

    throw new HttpException(`Customer #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
