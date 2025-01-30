import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@Schema()
@ObjectType()
export class BaseEntity extends Document {
  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;
}
