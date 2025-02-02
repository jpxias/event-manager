import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { EventInvitation } from './entities/event-invitation';
import { EventInvitationFilterInput } from './inputs/event-invitation-filter.input ';

@Injectable()
export class EventInvitationService extends BaseService<EventInvitation> {
  constructor(
    @InjectModel(EventInvitation.name)
    private readonly eventInvitation: Model<EventInvitation>,
  ) {
    super(eventInvitation);
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
      .populate('event')
      .exec();
  }
}
