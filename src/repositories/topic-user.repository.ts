import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TopicUser, TopicUserRelations, Topic} from '../models';
import {AuchanDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TopicRepository} from './topic.repository';

export class TopicUserRepository extends DefaultCrudRepository<
  TopicUser,
  typeof TopicUser.prototype.id,
  TopicUserRelations
> {

  public readonly Topic: BelongsToAccessor<Topic, typeof TopicUser.prototype.id>;

  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource, @repository.getter('TopicRepository') protected topicRepositoryGetter: Getter<TopicRepository>,
  ) {
    super(TopicUser, dataSource);
    this.Topic = this.createBelongsToAccessorFor('Topic', topicRepositoryGetter,);
    this.registerInclusionResolver('Topic', this.Topic.inclusionResolver);
  }
}
