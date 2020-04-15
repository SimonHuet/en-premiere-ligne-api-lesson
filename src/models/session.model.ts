import {Entity, model, property, hasOne} from '@loopback/repository';
import {Schedule} from './schedule.model';

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

  @hasOne(() => Schedule, {keyTo: 'sessionUUID'})
  schedule: Schedule;
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
