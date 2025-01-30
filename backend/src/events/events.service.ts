import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Event } from './entities/event.entity';
import { BaseService } from 'src/base/base.service';
import { EventInvitationInput } from 'src/event-invitation/inputs/event-invitation.input';
import { EventFilterInput } from './inputs/event-filter.input ';

@Injectable()
export class EventsService extends BaseService<Event> {
  constructor(@InjectModel(Event.name) private readonly event: Model<Event>) {
    super(event);
  }

  createOrUpdateEvent(
    id: Types.ObjectId,
    updateData: Partial<Event>,
    userId: Types.ObjectId,
  ): Promise<Event | null> {
    updateData = { ...updateData, user: userId };
    return this.createOrUpdate(id, updateData);
  }

  findAllEvents(filters: Partial<EventFilterInput>, userId: Types.ObjectId) {
    filters = { ...filters, user: userId };
    return this.findAll(filters);
  }

  async findEventById(id: Types.ObjectId, userId: Types.ObjectId) {
    const event = await this.findById(id);

    if (event?.user !== userId) {
      throw new ForbiddenException();
    }

    return event;
  }

  async removeEvent(id: Types.ObjectId, userId?: Types.ObjectId) {
    await this.findById(id);
    return this.remove(id);
  }
}
