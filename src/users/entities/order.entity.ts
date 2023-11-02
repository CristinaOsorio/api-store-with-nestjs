import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../../products/entities/product.entity';
import { User } from './user.entity';
import { Types } from 'mongoose';
import { Customer } from './customer.entity';

@Schema()
export class Order {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
