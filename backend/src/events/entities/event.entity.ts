import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaxLength } from 'class-validator';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
@ObjectType()
export class Event extends Document {
  @Field(() => ID)
  id: Types.ObjectId;

  @Field(() => String)
  @MaxLength(50)
  @Prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true })
  @MaxLength(300)
  @Prop({ required: false })
  description: string;

  @Field(() => Date)
  @Prop({ required: true })
  startDate: Date;

  @Field(() => Date)
  @Prop({ required: true })
  endDate: Date;

  @Field(() => Boolean, { nullable: true })
  @Prop({ required: false })
  freezed: Boolean;

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
