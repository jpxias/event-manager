import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { CreateEventInput } from './inputs/event.input';

@Resolver('Event')
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event])
  @UseGuards(JwtAuthGuard)
  findAllEvents(@Args('filter') filter: string, @CurrentUser() user: User) {
    return this.eventsService.findAllEvents(filter, user._id);
  }

  @Query(() => Event, { nullable: true })
  findEventById(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.eventsService.findById(id);
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
