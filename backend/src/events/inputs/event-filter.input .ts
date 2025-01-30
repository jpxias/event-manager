import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Event } from '../entities/event.entity';

@InputType()
export class EventFilterInput implements Partial<Event> {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => ID, { nullable: true })
  user?: Types.ObjectId;
}
