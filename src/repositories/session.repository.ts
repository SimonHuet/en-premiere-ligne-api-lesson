import {inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
} from '@loopback/repository';
import {AuchanDbDataSource} from '../datasources';
import {Schedule, Session, SessionRelations} from '../models';
export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.UUID,
  SessionRelations
> {
  public readonly schedule: HasOneRepositoryFactory<
    Schedule,
    typeof Session.prototype.UUID
  >;

  constructor(@inject('datasources.AuchanDB') dataSource: AuchanDbDataSource) {
    super(Session, dataSource);
    this.registerInclusionResolver('schedule', this.schedule.inclusionResolver);
  }
}
