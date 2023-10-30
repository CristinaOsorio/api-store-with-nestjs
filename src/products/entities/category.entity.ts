import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ requires: true, unique: true })
  name: string;

  @Prop()
  image: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
