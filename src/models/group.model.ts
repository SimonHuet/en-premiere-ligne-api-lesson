import {Entity, hasMany, model, property} from '@loopback/repository';
import {GroupUser} from './group-user.model';
import {Session} from './session.model';

@model({settings: {strict: true}})
export class Group extends Entity {
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

  @hasMany(() => GroupUser, {keyTo: 'groupUUID'})
  groupUsers: GroupUser[];

  @hasMany(() => Session, {keyTo: 'groupUUID'})
  sessions: Session[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
