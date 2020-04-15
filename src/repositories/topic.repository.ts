import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Topic, TopicRelations, TopicUser} from '../models';
import {AuchanDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TopicUserRepository} from './topic-user.repository';

export class TopicRepository extends DefaultCrudRepository<
  Topic,
  typeof Topic.prototype.UUID,
  TopicRelations
> {

  public readonly topicUsers: HasManyRepositoryFactory<TopicUser, typeof Topic.prototype.UUID>;

  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource, @repository.getter('TopicUserRepository') protected topicUserRepositoryGetter: Getter<TopicUserRepository>,
  ) {
    super(Topic, dataSource);
    this.topicUsers = this.createHasManyRepositoryFactoryFor('topicUsers', topicUserRepositoryGetter,);
    this.registerInclusionResolver('topicUsers', this.topicUsers.inclusionResolver);
  }
}
