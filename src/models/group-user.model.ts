import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Group} from './group.model';

@model({settings: {strict: false}})
export class GroupUser extends Entity {
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

  @belongsTo(() => Group, {name: 'groupUser'})
  groupUUID: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GroupUser>) {
    super(data);
  }
}

export interface GroupUserRelations {
  // describe navigational properties here
}

export type GroupUserWithRelations = GroupUser & GroupUserRelations;
