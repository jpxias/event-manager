import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseBaseQueryOptions, Types } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { Event } from './entities/event.entity';

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
    if (
      updateData.startDate &&
      updateData.endDate &&
      updateData.startDate > updateData.endDate
    ) {
      throw new BadRequestException('End date must be after start date');
    }

    return this.createOrUpdate(id, updateData);
  }

  findAllEvents(filter: string, userId: Types.ObjectId) {
    let filters: MongooseBaseQueryOptions = {
      user: userId,
    };
    if (filter) {
      filters = {
        ...filters,
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { description: { $regex: filter, $options: 'i' } },
        ],
      };
    }
    return this.findAll(filters);
  }

  async findEventById(id: Types.ObjectId, userId: Types.ObjectId) {
    const event = await this.findById(id);

    if (event?.user.toString() !== userId.toString()) {
      throw new ForbiddenException();
    }

    return event;
  }

  async removeEvent(id: Types.ObjectId, userId: Types.ObjectId) {
    await this.findEventById(id, userId);
    return this.remove(id);
  }
}
