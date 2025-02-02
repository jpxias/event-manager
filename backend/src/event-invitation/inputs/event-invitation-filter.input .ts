import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { EventInvitation } from '../entities/event-invitation';
import { InvitationAnswer } from '../enums/InvitationAnswer.enum';

@InputType()
export class EventInvitationFilterInput implements Partial<EventInvitation> {
  @Field(() => ID, { nullable: true })
  event?: Types.ObjectId;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => InvitationAnswer, { nullable: true })
  answer?: InvitationAnswer;
}
