import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GroupUser, GroupUserRelations, Group} from '../models';
import {AuchanDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GroupRepository} from './group.repository';

export class GroupUserRepository extends DefaultCrudRepository<
  GroupUser,
  typeof GroupUser.prototype.id,
  GroupUserRelations
> {

  public readonly group: BelongsToAccessor<Group, typeof GroupUser.prototype.id>;

  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>,
  ) {
    super(GroupUser, dataSource);
    this.group = this.createBelongsToAccessorFor('group', groupRepositoryGetter,);
    this.registerInclusionResolver('group', this.group.inclusionResolver);
  }
}
