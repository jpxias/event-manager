import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { EventsService } from 'src/events/events.service';
import { EventInvitation } from './entities/event-invitation';
import { EventInvitationFilterInput } from './inputs/event-invitation-filter.input ';

@Injectable()
export class EventInvitationService extends BaseService<EventInvitation> {
  constructor(
    @InjectModel(EventInvitation.name)
    private readonly eventInvitation: Model<EventInvitation>,
    private readonly eventService: EventsService,
  ) {
    super(eventInvitation);
  }

  async createOrUpdateInvitation(
    id: Types.ObjectId,
    updateData: Partial<EventInvitation>,
  ): Promise<EventInvitation | null> {
    if (updateData.event) {
      const event = await this.eventService.findById(updateData.event);
      if (event?.freezed) {
        throw new BadRequestException(
          'You can not answer to this event because it is freezed',
        );
      }
    }

    return this.createOrUpdate(id, updateData);
  }

  findEventInvitationsByEvent(
    eventInvitationInput: EventInvitationFilterInput,
  ): Promise<EventInvitation[]> {
    return this.eventInvitation
      .find({ event: eventInvitationInput.event })
      .exec();
  }

  findEventInvitationByEmail(
    eventInvitationInput: EventInvitationFilterInput,
  ): Promise<EventInvitation | null> {
    return this.eventInvitation
      .findOne({
        email: eventInvitationInput.email,
        event: eventInvitationInput.event,
      })
      .exec();
  }
}
