import { registerEnumType } from '@nestjs/graphql';

export enum InvitationAnswer {
  YES = 1,
  NO = 2,
  MAYBE = 3,
}

registerEnumType(InvitationAnswer, {
  name: 'InvitationAnswer',
  description: 'Possible answers to an event invitation',
});
