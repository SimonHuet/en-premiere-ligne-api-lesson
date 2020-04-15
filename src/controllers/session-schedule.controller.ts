import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Schedule, Session} from '../models';
import {SessionRepository} from '../repositories';

export class SessionScheduleController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) {}

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
    @param.path.string('id') id: typeof Session.prototype.id,
  ): Promise<Schedule> {
    return this.sessionRepository.schedule(id);
  }
}
