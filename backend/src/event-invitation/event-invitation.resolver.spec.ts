import { Test, TestingModule } from '@nestjs/testing';
import { EventInvitationResolver } from './event-invitation.resolver';
import { EventInvitationService } from './event-invitation.service';

describe('EventInvitationResolver', () => {
  let resolver: EventInvitationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventInvitationResolver, EventInvitationService],
    }).compile();

    resolver = module.get<EventInvitationResolver>(EventInvitationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
