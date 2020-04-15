import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Topic extends Entity {
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
