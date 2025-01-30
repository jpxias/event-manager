import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './inputs/event.input';
import { Types } from 'mongoose';
import { Event } from './entities/event.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver('Event')
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event])
  @UseGuards(JwtAuthGuard)
  findAllEvents() {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { nullable: true })
  findOneEvent(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.eventsService.findById(id);
  }

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  async createOrUpdateEvent(
    @Args('updateEventInput') updateEventInput: CreateEventInput,
  ) {
    return this.eventsService.createOrUpdate(
      updateEventInput.id,
      updateEventInput,
    );
  }

  @Mutation(() => Event)
  removeEvent(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.eventsService.remove(id);
  }
}
