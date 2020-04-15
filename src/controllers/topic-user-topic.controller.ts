import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TopicUser,
  Topic,
} from '../models';
import {TopicUserRepository} from '../repositories';

export class TopicUserTopicController {
  constructor(
    @repository(TopicUserRepository)
    public topicUserRepository: TopicUserRepository,
  ) { }

  @get('/topic-users/{id}/topic', {
    responses: {
      '200': {
        description: 'Topic belonging to TopicUser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Topic)},
          },
        },
      },
    },
  })
  async getTopic(
    @param.path.number('id') id: typeof TopicUser.prototype.id,
  ): Promise<Topic> {
    return this.topicUserRepository.topic(id);
  }
}
