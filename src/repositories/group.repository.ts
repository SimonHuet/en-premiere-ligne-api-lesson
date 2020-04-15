import {DefaultCrudRepository} from '@loopback/repository';
import {Group, GroupRelations} from '../models';
import {AuchanDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.UUID,
  GroupRelations
> {
  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource,
  ) {
    super(Group, dataSource);
  }
}
