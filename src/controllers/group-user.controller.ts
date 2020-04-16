import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {GroupUser} from '../models';
import {GroupUserRepository} from '../repositories';

export class GroupUserController {
  constructor(
    @repository(GroupUserRepository)
    public groupUserRepository : GroupUserRepository,
  ) {}

  @post('/group-users', {
    responses: {
      '200': {
        description: 'GroupUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(GroupUser)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GroupUser, {
            title: 'NewGroupUser',
            exclude: ['id'],
          }),
        },
      },
    })
    groupUser: Omit<GroupUser, 'id'>,
  ): Promise<GroupUser> {
    return this.groupUserRepository.create(groupUser);
  }

  @get('/group-users/count', {
    responses: {
      '200': {
        description: 'GroupUser model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(GroupUser) where?: Where<GroupUser>,
  ): Promise<Count> {
    return this.groupUserRepository.count(where);
  }

  @get('/group-users', {
    responses: {
      '200': {
        description: 'Array of GroupUser model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GroupUser, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(GroupUser) filter?: Filter<GroupUser>,
  ): Promise<GroupUser[]> {
    return this.groupUserRepository.find(filter);
  }

  @patch('/group-users', {
    responses: {
      '200': {
        description: 'GroupUser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GroupUser, {partial: true}),
        },
      },
    })
    groupUser: GroupUser,
    @param.where(GroupUser) where?: Where<GroupUser>,
  ): Promise<Count> {
    return this.groupUserRepository.updateAll(groupUser, where);
  }

  @get('/group-users/{id}', {
    responses: {
      '200': {
        description: 'GroupUser model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GroupUser, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GroupUser, {exclude: 'where'}) filter?: FilterExcludingWhere<GroupUser>
  ): Promise<GroupUser> {
    return this.groupUserRepository.findById(id, filter);
  }

  @patch('/group-users/{id}', {
    responses: {
      '204': {
        description: 'GroupUser PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GroupUser, {partial: true}),
        },
      },
    })
    groupUser: GroupUser,
  ): Promise<void> {
    await this.groupUserRepository.updateById(id, groupUser);
  }

  @put('/group-users/{id}', {
    responses: {
      '204': {
        description: 'GroupUser PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() groupUser: GroupUser,
  ): Promise<void> {
    await this.groupUserRepository.replaceById(id, groupUser);
  }

  @del('/group-users/{id}', {
    responses: {
      '204': {
        description: 'GroupUser DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.groupUserRepository.deleteById(id);
  }
}
