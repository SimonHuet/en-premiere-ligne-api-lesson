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
import {TopicUser} from '../models';
import {TopicUserRepository} from '../repositories';

export class TopicUserController {
  constructor(
    @repository(TopicUserRepository)
    public topicUserRepository : TopicUserRepository,
  ) {}

  @post('/topic-users', {
    responses: {
      '200': {
        description: 'TopicUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(TopicUser)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicUser, {
            title: 'NewTopicUser',
            exclude: ['id'],
          }),
        },
      },
    })
    topicUser: Omit<TopicUser, 'id'>,
  ): Promise<TopicUser> {
    return this.topicUserRepository.create(topicUser);
  }

  @get('/topic-users/count', {
    responses: {
      '200': {
        description: 'TopicUser model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TopicUser) where?: Where<TopicUser>,
  ): Promise<Count> {
    return this.topicUserRepository.count(where);
  }

  @get('/topic-users', {
    responses: {
      '200': {
        description: 'Array of TopicUser model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TopicUser, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TopicUser) filter?: Filter<TopicUser>,
  ): Promise<TopicUser[]> {
    return this.topicUserRepository.find(filter);
  }

  @patch('/topic-users', {
    responses: {
      '200': {
        description: 'TopicUser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicUser, {partial: true}),
        },
      },
    })
    topicUser: TopicUser,
    @param.where(TopicUser) where?: Where<TopicUser>,
  ): Promise<Count> {
    return this.topicUserRepository.updateAll(topicUser, where);
  }

  @get('/topic-users/{id}', {
    responses: {
      '200': {
        description: 'TopicUser model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TopicUser, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TopicUser, {exclude: 'where'}) filter?: FilterExcludingWhere<TopicUser>
  ): Promise<TopicUser> {
    return this.topicUserRepository.findById(id, filter);
  }

  @patch('/topic-users/{id}', {
    responses: {
      '204': {
        description: 'TopicUser PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicUser, {partial: true}),
        },
      },
    })
    topicUser: TopicUser,
  ): Promise<void> {
    await this.topicUserRepository.updateById(id, topicUser);
  }

  @put('/topic-users/{id}', {
    responses: {
      '204': {
        description: 'TopicUser PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() topicUser: TopicUser,
  ): Promise<void> {
    await this.topicUserRepository.replaceById(id, topicUser);
  }

  @del('/topic-users/{id}', {
    responses: {
      '204': {
        description: 'TopicUser DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.topicUserRepository.deleteById(id);
  }
}
