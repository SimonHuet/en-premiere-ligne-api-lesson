import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {AuchanDbDataSource} from '../datasources';
import {Topic, TopicUser, TopicUserRelations} from '../models';
import {TopicRepository} from './topic.repository';

export class TopicUserRepository extends DefaultCrudRepository<
  TopicUser,
  typeof TopicUser.prototype.id,
  TopicUserRelations
> {
  public readonly topic: BelongsToAccessor<
    Topic,
    typeof TopicUser.prototype.id
  >;

  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource,
    @repository.getter('TopicRepository')
    protected topicRepositoryGetter: Getter<TopicRepository>,
  ) {
    super(TopicUser, dataSource);
    this.topic = this.createBelongsToAccessorFor(
      'Topic',
      topicRepositoryGetter,
    );
    this.registerInclusionResolver('Topic', this.topic.inclusionResolver);
  }
}
