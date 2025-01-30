import { Module } from '@nestjs/common';
import { EventInvitationService } from './event-invitation.service';
import { EventInvitationResolver } from './event-invitation.resolver';
import {
  EventInvitation,
  EventInvitationSchema,
} from './entities/event-invitation';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventInvitation.name, schema: EventInvitationSchema },
    ]),
  ],
  providers: [EventInvitationResolver, EventInvitationService],
})
export class EventInvitationModule {}
