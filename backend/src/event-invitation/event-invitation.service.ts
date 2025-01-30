import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventInvitation } from './entities/event-invitation';
import { Model, Types } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { EventInvitationInput } from './inputs/event-invitation.input';

@Injectable()
export class EventInvitationService extends BaseService<EventInvitation> {
  constructor(
    @InjectModel(EventInvitation.name)
    private readonly eventInvitation: Model<EventInvitation>,
  ) {
    super(eventInvitation);
  }

  findEventInvitationByEmail(
    eventInvitationInput: EventInvitationInput,
  ): Promise<EventInvitation | null> {
    return this.findOne({
      email: eventInvitationInput.email,
      event: eventInvitationInput.event,
    });
  }
}
