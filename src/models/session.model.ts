import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Schedule} from './schedule.model';
import {Topic} from './topic.model';
import {Group} from './group.model';

@model({settings: {strict: false}})
export class Session extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  UUID?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Schedule, {name: 'schedule'})
  scheduleUUID: string;

  @belongsTo(() => Topic, {name: 'topic'})
  topicUUID: string;

  @belongsTo(() => Group, {name: 'group'})
  groupUUID: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Session>) {
    super(data);
  }
}

export interface SessionRelations {
  // describe navigational properties here
}

export type SessionWithRelations = Session & SessionRelations;
