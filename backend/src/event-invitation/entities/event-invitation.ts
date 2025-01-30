import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Event } from '../../events/entities/event.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { InvitationAnswer } from '../enums/InvitationAnswer.enum';

@Schema()
@ObjectType()
export class EventInvitation extends Document {
  @Field(() => String)
  @Prop({ type: MongoSchema.Types.ObjectId, ref: Event.name, required: true })
  event: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true })
  email: string;

  @Field(() => InvitationAnswer)
  @Prop({ required: true, enum: InvitationAnswer })
  answer: InvitationAnswer;
}

export const EventInvitationSchema =
  SchemaFactory.createForClass(EventInvitation);

EventInvitationSchema.index({ email: 1, event: 1 }, { unique: true });
