import { registerEnumType } from '@nestjs/graphql';

export enum InvitationAnswer {
  NO = 0,
  YES = 1,
  MAYBE = 2,
}

registerEnumType(InvitationAnswer, {
  name: 'InvitationAnswer',
  description: 'Possible answers to an event invitation',
});
