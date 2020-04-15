import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Topic} from './topic.model';

@model({settings: {strict: true}})
export class TopicUser extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  userUUID: string;

  @belongsTo(() => Topic, {name: 'Topic'})
  topicUUID: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TopicUser>) {
    super(data);
  }
}

export interface TopicUserRelations {
  // describe navigational properties here
}

export type TopicUserWithRelations = TopicUser & TopicUserRelations;
