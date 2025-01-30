import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EventInvitationService } from './event-invitation.service';
import { AnswerInvitationInput } from './dto/answer-invitation.input';
import { EventInvitation } from './entities/event-invitation';

@Resolver('EventInvitation')
export class EventInvitationResolver {
  constructor(
    private readonly eventInvitationService: EventInvitationService,
  ) {}

  @Mutation(() => EventInvitation)
  createOrUpdateEventInvitation(
    @Args('setEventInvitation') createEventInput: AnswerInvitationInput,
  ) {
    return this.eventInvitationService.createOrUpdate(
      createEventInput.id,
      createEventInput,
    );
  }
}
