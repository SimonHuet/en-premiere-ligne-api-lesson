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
  Group,
} from '../models';
import {SessionRepository} from '../repositories';

export class SessionGroupController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) { }

  @get('/sessions/{id}/group', {
    responses: {
      '200': {
        description: 'Group belonging to Session',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Group)},
          },
        },
      },
    },
  })
  async getGroup(
    @param.path.string('id') id: typeof Session.prototype.UUID,
  ): Promise<Group> {
    return this.sessionRepository.group(id);
  }
}
