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

  findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  findById(id: Types.ObjectId): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  remove(id: Types.ObjectId) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
