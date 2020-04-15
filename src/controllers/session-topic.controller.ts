import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Session, Topic} from '../models';
import {SessionRepository} from '../repositories';

export class SessionTopicController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) {}

  @get('/sessions/{id}/topic', {
    responses: {
      '200': {
        description: 'Topic belonging to Session',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Topic)},
          },
        },
      },
    },
  })
  async getTopic(
    @param.path.string('id') id: typeof Session.prototype.id,
  ): Promise<Topic> {
    return this.sessionRepository.topic(id);
  }
}
