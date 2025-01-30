import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Event } from '../entities/event.entity';

@InputType()
export class CreateEventInput implements Partial<Event> {
  @Field(() => ID, { nullable: true })
  id: Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;
}
