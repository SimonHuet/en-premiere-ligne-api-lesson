import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {AuchanDbDataSource} from '../datasources';
import {Session, SessionRelations, Schedule, Topic, Group} from '../models';
import {ScheduleRepository} from './schedule.repository';
import {TopicRepository} from './topic.repository';
import {GroupRepository} from './group.repository';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.UUID,
  SessionRelations
> {

  public readonly schedule: BelongsToAccessor<Schedule, typeof Session.prototype.UUID>;

  public readonly topic: BelongsToAccessor<Topic, typeof Session.prototype.UUID>;

  public readonly group: BelongsToAccessor<Group, typeof Session.prototype.UUID>;

  constructor(@inject('datasources.AuchanDB') dataSource: AuchanDbDataSource, @repository.getter('ScheduleRepository') protected scheduleRepositoryGetter: Getter<ScheduleRepository>, @repository.getter('TopicRepository') protected topicRepositoryGetter: Getter<TopicRepository>, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>,) {
    super(Session, dataSource);
    this.group = this.createBelongsToAccessorFor('group', groupRepositoryGetter,);
    this.registerInclusionResolver('group', this.group.inclusionResolver);
    this.topic = this.createBelongsToAccessorFor('topic', topicRepositoryGetter,);
    this.registerInclusionResolver('topic', this.topic.inclusionResolver);
    this.schedule = this.createBelongsToAccessorFor('schedule', scheduleRepositoryGetter,);
    this.registerInclusionResolver('schedule', this.schedule.inclusionResolver);
  }
}
