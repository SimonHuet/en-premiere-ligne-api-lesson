import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Group, Session} from '../models';
import {SessionRepository} from '../repositories';

export class SessionGroupController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) {}

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
    @param.path.string('id') id: typeof Session.prototype.id,
  ): Promise<Group> {
    return this.sessionRepository.group(id);
  }
}
