import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ObjectId, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): Partial<User> => {
    const context = GqlExecutionContext.create(ctx);
    const userPayload = context.getContext().req?.user;

    if (!userPayload) {
      throw new UnauthorizedException();
    }

    return {
      _id: Types.ObjectId.createFromHexString(userPayload.id),
      username: userPayload.username,
    };
  },
);
