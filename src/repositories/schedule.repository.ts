import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AuchanDbDataSource} from '../datasources';
import {Schedule, ScheduleRelations} from '../models';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.UUID,
  ScheduleRelations
> {
  constructor(@inject('datasources.AuchanDB') dataSource: AuchanDbDataSource) {
    super(Schedule, dataSource);
  }
}
