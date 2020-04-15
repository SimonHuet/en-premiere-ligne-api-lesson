import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {AuchanDbDataSource} from '../datasources';
import {Topic, TopicRelations, TopicUser} from '../models';
import {TopicUserRepository} from './topic-user.repository';

export class TopicRepository extends DefaultCrudRepository<
  Topic,
  typeof Topic.prototype.id,
  TopicRelations
> {
  public readonly topicUsers: HasManyRepositoryFactory<
    TopicUser,
    typeof Topic.prototype.id
  >;

  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource,
    @repository.getter('TopicUserRepository')
    protected topicUserRepositoryGetter: Getter<TopicUserRepository>,
  ) {
    super(Topic, dataSource);
    this.topicUsers = this.createHasManyRepositoryFactoryFor(
      'topicUsers',
      topicUserRepositoryGetter,
    );
    this.registerInclusionResolver(
      'topicUsers',
      this.topicUsers.inclusionResolver,
    );
  }
}
