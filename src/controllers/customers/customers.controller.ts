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
import { CreateCustomerDto, UpdateCustomerDto } from '@dtos/customers.dtos';
import { Customer } from '@entities/customer.entity';
import { CustomersService } from '@services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll(): Customer[] {
    return this.customersService.findAll();
  }

  @Get(':customerId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('customerId', ParseIntPipe) customerId: number): Customer {
    return this.customersService.findOne(customerId);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto): Customer {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ): Customer {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): boolean {
    return this.customersService.delete(id);
  }
}
