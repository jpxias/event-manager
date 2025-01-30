import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Event } from './entities/event.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class EventsService extends BaseService<Event> {
  constructor(@InjectModel(Event.name) private readonly event: Model<Event>) {
    super(event);
  }

  createOrUpdate(
    id: Types.ObjectId,
    updateData: Partial<Event>,
  ): Promise<Event | null> {
    return super.createOrUpdate(id, updateData);
  }
}
