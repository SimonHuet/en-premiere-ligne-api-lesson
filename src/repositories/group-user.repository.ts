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

  public readonly groupUser: BelongsToAccessor<Group, typeof GroupUser.prototype.id>;

  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>,
  ) {
    super(GroupUser, dataSource);
    this.groupUser = this.createBelongsToAccessorFor('groupUser', groupRepositoryGetter,);
    this.registerInclusionResolver('groupUser', this.groupUser.inclusionResolver);
  }
}
