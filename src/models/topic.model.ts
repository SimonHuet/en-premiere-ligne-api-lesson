import {Entity, hasMany, model, property} from '@loopback/repository';
import {TopicUser} from './topic-user.model';

@model({settings: {strict: true}})
export class Topic extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => TopicUser, {keyTo: 'topicUUID'})
  topicUsers: TopicUser[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Topic>) {
    super(data);
  }
}

export interface TopicRelations {
  // describe navigational properties here
}

export type TopicWithRelations = Topic & TopicRelations;
