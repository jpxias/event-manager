import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.user.findOne({ username }).exec();
  }

  async createUser(user: CreateUserInput): Promise<User | null> {
    return new this.user(user).save();
  }
}
