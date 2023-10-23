import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Pedro',
      lastName: 'Walle',
      phone: '123456789',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((customer) => customer.id == id);

    if (!customer) {
      throw new HttpException(
        `Customer #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return customer;
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const customer = {
      id: this.counterId,
      ...payload,
    };

    this.customers.push(customer);

    return customer;
  }

  update(id: number, payload: any) {
    const customerIndex = this.searchIndex(id);
    if (customerIndex !== -1) {
      this.customers[customerIndex] = {
        ...this.customers[customerIndex],
        ...payload,
      };
      return this.customers[customerIndex];
    }

    throw new HttpException(`Customer #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: number): boolean {
    const customerIndex = this.searchIndex(id);
    if (customerIndex === -1) {
      throw new HttpException(
        `Customer #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.customers.splice(customerIndex, 1);

    return true;
  }

  private searchIndex(id: number): number {
    return this.customers.findIndex((customer) => customer.id === id);
  }
}
