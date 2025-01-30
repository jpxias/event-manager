import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventInvitation } from './entities/event-invitation';
import { Model, Types } from 'mongoose';
import { AnswerInvitationInput } from './dto/answer-invitation.input';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class EventInvitationService extends BaseService<EventInvitation> {
  constructor(
    @InjectModel(EventInvitation.name)
    private readonly eventInvitation: Model<EventInvitation>,
  ) {
    super(eventInvitation);
  }
}
