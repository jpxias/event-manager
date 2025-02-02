import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EventInvitation } from './entities/event-invitation';
import { EventInvitationService } from './event-invitation.service';
import { EventInvitationFilterInput } from './inputs/event-invitation-filter.input ';
import { EventInvitationInput } from './inputs/event-invitation.input';

@Resolver('EventInvitation')
export class EventInvitationResolver {
  constructor(
    private readonly eventInvitationService: EventInvitationService,
  ) {}

  @Query(() => EventInvitation)
  findOneEventInvitationByEmail(
    @Args('eventInvitation') createEventInput: EventInvitationFilterInput,
  ) {
    return this.eventInvitationService.findEventInvitationByEmail(
      createEventInput,
    );
  }

  @Query(() => [EventInvitation])
  @UseGuards(JwtAuthGuard)
  async findEventInvitationsByEvent(
    @Args('eventInvitation') eventInvitationFilter: EventInvitationFilterInput,
  ) {
    return this.eventInvitationService.findEventInvitationsByEvent(
      eventInvitationFilter,
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
