import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Session,
  Schedule,
} from '../models';
import {SessionRepository} from '../repositories';

export class SessionScheduleController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) { }

  @get('/sessions/{id}/schedule', {
    responses: {
      '200': {
        description: 'Schedule belonging to Session',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Schedule)},
          },
        },
      },
    },
  })
  async getSchedule(
    @param.path.string('id') id: typeof Session.prototype.UUID,
  ): Promise<Schedule> {
    return this.sessionRepository.schedule(id);
  }
}
