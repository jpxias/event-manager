import { NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';

export class BaseService<T> {
  constructor(private readonly model: Model<T>) {}

  async createOrUpdate(
    id: Types.ObjectId,
    updateData: Partial<T>,
  ): Promise<T | null> {
    if (!id) {
      const docSaved = await new this.model(updateData).save();
      return docSaved as T;
    }

    return this.model
      .findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true, upsert: true },
      )
      .exec();
  }

  findOne(filters: Partial<T>) {
    return this.model.findOne(filters).exec();
  }

  findAll(filters: Partial<T> = {}): Promise<T[]> {
    return this.model.find(filters).exec();
  }

  async findById(id: Types.ObjectId): Promise<T | null> {
    const item = await this.model.findById(id).exec();

    if (!item) {
      throw new NotFoundException(`This item could not be found`);
    }

    return item;
  }

  remove(id: Types.ObjectId) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
