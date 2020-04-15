import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Group,
  GroupUser,
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupGroupUserController {
  constructor(
    @repository(GroupRepository) protected groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/group-users', {
    responses: {
      '200': {
        description: 'Array of Group has many GroupUser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GroupUser)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<GroupUser>,
  ): Promise<GroupUser[]> {
    return this.groupRepository.groupUsers(id).find(filter);
  }

  @post('/groups/{id}/group-users', {
    responses: {
      '200': {
        description: 'Group model instance',
        content: {'application/json': {schema: getModelSchemaRef(GroupUser)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Group.prototype.UUID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GroupUser, {
            title: 'NewGroupUserInGroup',
            exclude: ['id'],
            optional: ['groupUUID']
          }),
        },
      },
    }) groupUser: Omit<GroupUser, 'id'>,
  ): Promise<GroupUser> {
    return this.groupRepository.groupUsers(id).create(groupUser);
  }

  @patch('/groups/{id}/group-users', {
    responses: {
      '200': {
        description: 'Group.GroupUser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GroupUser, {partial: true}),
        },
      },
    })
    groupUser: Partial<GroupUser>,
    @param.query.object('where', getWhereSchemaFor(GroupUser)) where?: Where<GroupUser>,
  ): Promise<Count> {
    return this.groupRepository.groupUsers(id).patch(groupUser, where);
  }

  @del('/groups/{id}/group-users', {
    responses: {
      '200': {
        description: 'Group.GroupUser DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(GroupUser)) where?: Where<GroupUser>,
  ): Promise<Count> {
    return this.groupRepository.groupUsers(id).delete(where);
  }
}
