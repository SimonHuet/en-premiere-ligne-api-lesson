import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Group, GroupRelations, GroupUser, Session} from '../models';
import {AuchanDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GroupUserRepository} from './group-user.repository';
import {SessionRepository} from './session.repository';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.UUID,
  GroupRelations
> {

  public readonly groupUsers: HasManyRepositoryFactory<GroupUser, typeof Group.prototype.UUID>;

  public readonly sessions: HasManyRepositoryFactory<Session, typeof Group.prototype.UUID>;

  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource, @repository.getter('GroupUserRepository') protected groupUserRepositoryGetter: Getter<GroupUserRepository>, @repository.getter('SessionRepository') protected sessionRepositoryGetter: Getter<SessionRepository>,
  ) {
    super(Group, dataSource);
    this.sessions = this.createHasManyRepositoryFactoryFor('sessions', sessionRepositoryGetter,);
    this.registerInclusionResolver('sessions', this.sessions.inclusionResolver);
    this.groupUsers = this.createHasManyRepositoryFactoryFor('groupUsers', groupUserRepositoryGetter,);
    this.registerInclusionResolver('groupUsers', this.groupUsers.inclusionResolver);
  }
}
