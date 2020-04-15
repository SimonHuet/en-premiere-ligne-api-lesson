import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {AuchanDbDataSource} from '../datasources';
import {Group, Schedule, Session, SessionRelations, Topic} from '../models';
import {GroupRepository} from './group.repository';
import {ScheduleRepository} from './schedule.repository';
import {TopicRepository} from './topic.repository';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.id,
  SessionRelations
> {
  public readonly schedule: BelongsToAccessor<
    Schedule,
    typeof Session.prototype.id
  >;

  public readonly topic: BelongsToAccessor<Topic, typeof Session.prototype.id>;

  public readonly group: BelongsToAccessor<Group, typeof Session.prototype.id>;

  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource,
    @repository.getter('ScheduleRepository')
    protected scheduleRepositoryGetter: Getter<ScheduleRepository>,
    @repository.getter('TopicRepository')
    protected topicRepositoryGetter: Getter<TopicRepository>,
    @repository.getter('GroupRepository')
    protected groupRepositoryGetter: Getter<GroupRepository>,
  ) {
    super(Session, dataSource);
    this.group = this.createBelongsToAccessorFor(
      'group',
      groupRepositoryGetter,
    );
    this.registerInclusionResolver('group', this.group.inclusionResolver);
    this.topic = this.createBelongsToAccessorFor(
      'topic',
      topicRepositoryGetter,
    );
    this.registerInclusionResolver('topic', this.topic.inclusionResolver);
    this.schedule = this.createBelongsToAccessorFor(
      'schedule',
      scheduleRepositoryGetter,
    );
    this.registerInclusionResolver('schedule', this.schedule.inclusionResolver);
  }
}
