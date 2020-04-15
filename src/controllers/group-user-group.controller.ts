import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  GroupUser,
  Group,
} from '../models';
import {GroupUserRepository} from '../repositories';

export class GroupUserGroupController {
  constructor(
    @repository(GroupUserRepository)
    public groupUserRepository: GroupUserRepository,
  ) { }

  @get('/group-users/{id}/group', {
    responses: {
      '200': {
        description: 'Group belonging to GroupUser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Group)},
          },
        },
      },
    },
  })
  async getGroup(
    @param.path.number('id') id: typeof GroupUser.prototype.id,
  ): Promise<Group> {
    return this.groupUserRepository.group(id);
  }
}
