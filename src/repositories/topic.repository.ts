import {DefaultCrudRepository} from '@loopback/repository';
import {Topic, TopicRelations} from '../models';
import {AuchanDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TopicRepository extends DefaultCrudRepository<
  Topic,
  typeof Topic.prototype.UUID,
  TopicRelations
> {
  constructor(
    @inject('datasources.AuchanDB') dataSource: AuchanDbDataSource,
  ) {
    super(Topic, dataSource);
  }
}
