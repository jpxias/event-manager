import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EventInvitationService } from './event-invitation.service';
import { EventInvitationInput } from './inputs/event-invitation.input';
import { EventInvitation } from './entities/event-invitation';

@Resolver('EventInvitation')
export class EventInvitationResolver {
  constructor(
    private readonly eventInvitationService: EventInvitationService,
  ) {}

  @Mutation(() => EventInvitation)
  findInvitationByEmail(
    @Args('eventInvitation') createEventInput: EventInvitationInput,
  ) {
    return this.eventInvitationService.findEventInvitationByEmail(
      createEventInput,
    );
  }

  @Mutation(() => EventInvitation)
  createOrUpdateEventInvitation(
    @Args('setEventInvitation') eventInvitationInput: EventInvitationInput,
  ) {
    return this.eventInvitationService.createOrUpdate(
      eventInvitationInput.id,
      eventInvitationInput,
    );
  }
}
