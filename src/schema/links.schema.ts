import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types, Document } from 'mongoose';

@Schema({ collection: 'link' })
export class Link {
  @Prop({ type: Object, required: true })
  original: string;

  @Prop({ type: Object, required: false })
  cut: string;
}

@Schema({ collection: 'links' })
export class Links {
  @Prop({ type: Object, required: false })
  link: Link;

  @Prop({ type: String, required: false })
  UserID: ObjectId;

  @Prop({ type: Date, required: false })
  ExpiredAt: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Links);

export type LinkLeanDoc = Links & { _id: Types.ObjectId };
export type LinkDoc = Links & Document;