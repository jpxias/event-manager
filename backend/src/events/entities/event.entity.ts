import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
@ObjectType()
export class Event extends Document {
  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  description: string;

  @Field(() => Date)
  @Prop({ required: true })
  startDate: Date;

  @Field(() => Date)
  @Prop({ required: true })
  endDate: Date;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
