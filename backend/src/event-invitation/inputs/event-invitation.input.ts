import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { EventInvitation } from '../entities/event-invitation';
import { InvitationAnswer } from '../enums/InvitationAnswer.enum';

@InputType()
export class EventInvitationInput implements Partial<EventInvitation> {
  @Field(() => ID, { nullable: true })
  id: Types.ObjectId;

  @Field(() => ID)
  event: Types.ObjectId;

  @Field(() => String)
  email: string;

  @Field(() => InvitationAnswer)
  answer: InvitationAnswer;
}
