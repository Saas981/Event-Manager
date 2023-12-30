import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerParticipants = {
  readonly id?: string | null;
  readonly name?: string | null;
}

type LazyParticipants = {
  readonly id?: string | null;
  readonly name?: string | null;
}

export declare type Participants = LazyLoading extends LazyLoadingDisabled ? EagerParticipants : LazyParticipants

export declare const Participants: (new (init: ModelInit<Participants>) => Participants)

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly startTime: string;
  readonly location: string;
  readonly reoccuring?: boolean | null;
  readonly endTime?: string | null;
  readonly participants?: (Participants | null)[] | null;
  readonly capacity?: number | null;
  readonly description?: string | null;
  readonly organizer?: string | null;
  readonly rating?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly startTime: string;
  readonly location: string;
  readonly reoccuring?: boolean | null;
  readonly endTime?: string | null;
  readonly participants?: (Participants | null)[] | null;
  readonly capacity?: number | null;
  readonly description?: string | null;
  readonly organizer?: string | null;
  readonly rating?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}