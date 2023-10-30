import { Category } from './category.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
