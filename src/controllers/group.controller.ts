import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Group} from '../models';
import {GroupRepository, GroupUserRepository} from '../repositories';
import {UserProvider} from '../services';

export class GroupController {
  constructor(
    @repository(GroupRepository)
    public groupRepository: GroupRepository,
    @repository(GroupUserRepository)
    public groupUserRepository: GroupUserRepository,
    public userProvider: UserProvider = new UserProvider(),
  ) {}

  @post('/groups', {
    responses: {
      '200': {
        description: 'Group model instance',
        content: {'application/json': {schema: getModelSchemaRef(Group)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {
            title: 'NewGroup',
            exclude: ['id'],
          }),
        },
      },
    })
    group: Omit<Group, 'id'>,
  ): Promise<Group> {
    return this.groupRepository.create(group);
  }

  @get('/groups/count', {
    responses: {
      '200': {
        description: 'Group model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Group) where?: Where<Group>): Promise<Count> {
    return this.groupRepository.count(where);
  }

  @get('/groups', {
    responses: {
      '200': {
        description: 'Array of Group model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Group, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Group) filter?: Filter<Group>): Promise<Group[]> {
    return this.groupRepository.find(filter);
  }

  @patch('/groups', {
    responses: {
      '200': {
        description: 'Group PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {partial: true}),
        },
      },
    })
    group: Group,
    @param.where(Group) where?: Where<Group>,
  ): Promise<Count> {
    return this.groupRepository.updateAll(group, where);
  }

  @get('/groups/{id}', {
    responses: {
      '200': {
        description: 'Group model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Group, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Group, {exclude: 'where'})
    filter?: FilterExcludingWhere<Group>,
  ): Promise<Group> {
    return this.groupRepository.findById(id, filter);
  }

  @patch('/groups/{id}', {
    responses: {
      '204': {
        description: 'Group PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {partial: true}),
        },
      },
    })
    group: Group,
  ): Promise<void> {
    await this.groupRepository.updateById(id, group);
  }

  @put('/groups/{id}', {
    responses: {
      '204': {
        description: 'Group PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() group: Group,
  ): Promise<void> {
    await this.groupRepository.replaceById(id, group);
  }

  @del('/groups/{id}', {
    responses: {
      '204': {
        description: 'Group DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.groupRepository.deleteById(id);
  }

  @get('/users/{id}/groups', {
    responses: {
      '200': {
        description: "Group's users model instance",
      },
    },
  })
  async getUserGroups(@param.path.string('id') id: string): Promise<object> {
    const groups = (
      await (await this.userProvider.value()).getUserGroups(id)
    ).map(userGroup => userGroup.group);

    return groups;
  }

  @get('/groups/{id}/users', {
    responses: {
      '200': {
        description: "Users's groups model instance",
      },
    },
  })
  async getGroupUsers(@param.path.string('id') id: string): Promise<object> {
    const groupUsersUUID = (
      await this.groupUserRepository.find({
        where: {
          groupUUID: id,
        },
      })
    ).map(groupUser => ({
      id: groupUser.userUUID,
    }));

    const query = {
      where: {
        or: groupUsersUUID,
      },
    };

    const groupUsers = await (await this.userProvider.value()).getUsers(
      JSON.stringify(query),
    );

    return groupUsers;
  }
}
