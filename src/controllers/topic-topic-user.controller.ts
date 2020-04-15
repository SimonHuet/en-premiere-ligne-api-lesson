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
import {Topic, TopicUser} from '../models';
import {TopicRepository} from '../repositories';

export class TopicTopicUserController {
  constructor(
    @repository(TopicRepository) protected topicRepository: TopicRepository,
  ) {}

  @get('/topics/{id}/topic-users', {
    responses: {
      '200': {
        description: 'Array of Topic has many TopicUser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TopicUser)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TopicUser>,
  ): Promise<TopicUser[]> {
    return this.topicRepository.topicUsers(id).find(filter);
  }

  @post('/topics/{id}/topic-users', {
    responses: {
      '200': {
        description: 'Topic model instance',
        content: {'application/json': {schema: getModelSchemaRef(TopicUser)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Topic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicUser, {
            title: 'NewTopicUserInTopic',
            exclude: ['id'],
            optional: ['topicUUID'],
          }),
        },
      },
    })
    topicUser: Omit<TopicUser, 'id'>,
  ): Promise<TopicUser> {
    return this.topicRepository.topicUsers(id).create(topicUser);
  }

  @patch('/topics/{id}/topic-users', {
    responses: {
      '200': {
        description: 'Topic.TopicUser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicUser, {partial: true}),
        },
      },
    })
    topicUser: Partial<TopicUser>,
    @param.query.object('where', getWhereSchemaFor(TopicUser))
    where?: Where<TopicUser>,
  ): Promise<Count> {
    return this.topicRepository.topicUsers(id).patch(topicUser, where);
  }

  @del('/topics/{id}/topic-users', {
    responses: {
      '200': {
        description: 'Topic.TopicUser DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TopicUser))
    where?: Where<TopicUser>,
  ): Promise<Count> {
    return this.topicRepository.topicUsers(id).delete(where);
  }
}
