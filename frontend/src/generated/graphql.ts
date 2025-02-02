import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateEventInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type CreateUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  user: Scalars['ID']['output'];
};

export type EventFilterInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type EventInvitation = {
  __typename?: 'EventInvitation';
  answer: InvitationAnswer;
  email: Scalars['String']['output'];
  event?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
};

export type EventInvitationFilterInput = {
  answer?: InputMaybe<InvitationAnswer>;
  email?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<Scalars['ID']['input']>;
};

export type EventInvitationInput = {
  answer: InvitationAnswer;
  email: Scalars['String']['input'];
  event: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Possible answers to an event invitation */
export enum InvitationAnswer {
  Maybe = 'MAYBE',
  No = 'NO',
  Yes = 'YES'
}

export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdateEvent: Event;
  createOrUpdateEventInvitation: EventInvitation;
  createUser: User;
  login: Scalars['String']['output'];
  removeEvent: Event;
};


export type MutationCreateOrUpdateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateOrUpdateEventInvitationArgs = {
  setEventInvitation: EventInvitationInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRemoveEventArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  findAllEvents: Array<Event>;
  findEventInvitationsByEvent: Array<EventInvitation>;
  findOneEvent?: Maybe<Event>;
  findOneEventInvitationByEmail: EventInvitation;
};


export type QueryFindAllEventsArgs = {
  filter: EventFilterInput;
};


export type QueryFindEventInvitationsByEventArgs = {
  eventInvitation: EventInvitationFilterInput;
};


export type QueryFindOneEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneEventInvitationByEmailArgs = {
  eventInvitation: EventInvitationFilterInput;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type FindInvitationByEmailQueryVariables = Exact<{
  eventInvitation: EventInvitationFilterInput;
}>;


export type FindInvitationByEmailQuery = { __typename?: 'Query', findOneEventInvitationByEmail: { __typename?: 'EventInvitation', id: string, email: string, answer: InvitationAnswer, event?: string | null } };

export type CreateOrUpdateEventInvitationMutationVariables = Exact<{
  setEventInvitation: EventInvitationInput;
}>;


export type CreateOrUpdateEventInvitationMutation = { __typename?: 'Mutation', createOrUpdateEventInvitation: { __typename?: 'EventInvitation', id: string, email: string, answer: InvitationAnswer, event?: string | null } };

export type FindEventInvitationsByEventQueryVariables = Exact<{
  eventInvitation: EventInvitationFilterInput;
}>;


export type FindEventInvitationsByEventQuery = { __typename?: 'Query', findEventInvitationsByEvent: Array<{ __typename?: 'EventInvitation', id: string, email: string, answer: InvitationAnswer, event?: string | null }> };

export type FindAllEventsQueryVariables = Exact<{
  filter: EventFilterInput;
}>;


export type FindAllEventsQuery = { __typename?: 'Query', findAllEvents: Array<{ __typename?: 'Event', id: string, name: string, description?: string | null, startDate: any, endDate: any, user: string }> };

export type FindOneEventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindOneEventQuery = { __typename?: 'Query', findOneEvent?: { __typename?: 'Event', id: string, name: string, description?: string | null, startDate: any, endDate: any, user: string } | null };

export type CreateOrUpdateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateOrUpdateEventMutation = { __typename?: 'Mutation', createOrUpdateEvent: { __typename?: 'Event', id: string, name: string, description?: string | null, startDate: any, endDate: any, user: string } };

export type RemoveEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveEventMutation = { __typename?: 'Mutation', removeEvent: { __typename?: 'Event', id: string, name: string, description?: string | null, startDate: any, endDate: any, user: string } };


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
    `;
export const FindInvitationByEmailDocument = gql`
    query FindInvitationByEmail($eventInvitation: EventInvitationFilterInput!) {
  findOneEventInvitationByEmail(eventInvitation: $eventInvitation) {
    id
    email
    answer
    event
  }
}
    `;
export const CreateOrUpdateEventInvitationDocument = gql`
    mutation CreateOrUpdateEventInvitation($setEventInvitation: EventInvitationInput!) {
  createOrUpdateEventInvitation(setEventInvitation: $setEventInvitation) {
    id
    email
    answer
    event
  }
}
    `;
export const FindEventInvitationsByEventDocument = gql`
    query FindEventInvitationsByEvent($eventInvitation: EventInvitationFilterInput!) {
  findEventInvitationsByEvent(eventInvitation: $eventInvitation) {
    id
    email
    answer
    event
  }
}
    `;
export const FindAllEventsDocument = gql`
    query FindAllEvents($filter: EventFilterInput!) {
  findAllEvents(filter: $filter) {
    id
    name
    description
    startDate
    endDate
    user
  }
}
    `;
export const FindOneEventDocument = gql`
    query FindOneEvent($id: ID!) {
  findOneEvent(id: $id) {
    id
    name
    description
    startDate
    endDate
    user
  }
}
    `;
export const CreateOrUpdateEventDocument = gql`
    mutation CreateOrUpdateEvent($input: CreateEventInput!) {
  createOrUpdateEvent(input: $input) {
    id
    name
    description
    startDate
    endDate
    user
  }
}
    `;
export const RemoveEventDocument = gql`
    mutation RemoveEvent($id: ID!) {
  removeEvent(id: $id) {
    id
    name
    description
    startDate
    endDate
    user
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Login(variables: LoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login', 'mutation', variables);
    },
    FindInvitationByEmail(variables: FindInvitationByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindInvitationByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindInvitationByEmailQuery>(FindInvitationByEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindInvitationByEmail', 'query', variables);
    },
    CreateOrUpdateEventInvitation(variables: CreateOrUpdateEventInvitationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateOrUpdateEventInvitationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrUpdateEventInvitationMutation>(CreateOrUpdateEventInvitationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateOrUpdateEventInvitation', 'mutation', variables);
    },
    FindEventInvitationsByEvent(variables: FindEventInvitationsByEventQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindEventInvitationsByEventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindEventInvitationsByEventQuery>(FindEventInvitationsByEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindEventInvitationsByEvent', 'query', variables);
    },
    FindAllEvents(variables: FindAllEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindAllEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindAllEventsQuery>(FindAllEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindAllEvents', 'query', variables);
    },
    FindOneEvent(variables: FindOneEventQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FindOneEventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindOneEventQuery>(FindOneEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindOneEvent', 'query', variables);
    },
    CreateOrUpdateEvent(variables: CreateOrUpdateEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateOrUpdateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrUpdateEventMutation>(CreateOrUpdateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateOrUpdateEvent', 'mutation', variables);
    },
    RemoveEvent(variables: RemoveEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RemoveEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveEventMutation>(RemoveEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemoveEvent', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;