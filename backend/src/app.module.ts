import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventInvitationModule } from './event-invitation/event-invitation.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    EventInvitationModule,
  ],
})
export class AppModule {}
