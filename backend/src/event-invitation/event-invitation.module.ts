import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import {
  EventInvitation,
  EventInvitationSchema,
} from './entities/event-invitation';
import { EventInvitationResolver } from './event-invitation.resolver';
import { EventInvitationService } from './event-invitation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventInvitation.name, schema: EventInvitationSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  providers: [EventInvitationResolver, EventInvitationService, EventsService],
})
export class EventInvitationModule {}
