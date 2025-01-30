import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './inputs/event.input';
import { Types } from 'mongoose';
import { Event } from './entities/event.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { EventInvitationInput } from 'src/event-invitation/inputs/event-invitation.input';
import { EventFilterInput } from './inputs/event-filter.input ';

@Resolver('Event')
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event])
  @UseGuards(JwtAuthGuard)
  findAllEvents(
    @Args('filter') filter: EventFilterInput,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.findAllEvents(filter, user._id);
  }

  @Query(() => Event, { nullable: true })
  findOneEvent(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.findEventById(id, user._id);
  }

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  createOrUpdateEvent(
    @Args('input') updateEventInput: CreateEventInput,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.createOrUpdateEvent(
      updateEventInput.id,
      updateEventInput,
      user._id,
    );
  }

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  removeEvent(
    @Args('id', { type: () => ID }) id: Types.ObjectId,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.removeEvent(id, user._id);
  }
}
