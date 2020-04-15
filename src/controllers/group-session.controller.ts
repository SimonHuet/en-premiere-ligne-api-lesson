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
  Session,
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupSessionController {
  constructor(
    @repository(GroupRepository) protected groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/sessions', {
    responses: {
      '200': {
        description: 'Array of Group has many Session',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Session)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Session>,
  ): Promise<Session[]> {
    return this.groupRepository.sessions(id).find(filter);
  }

  @post('/groups/{id}/sessions', {
    responses: {
      '200': {
        description: 'Group model instance',
        content: {'application/json': {schema: getModelSchemaRef(Session)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Group.prototype.UUID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Session, {
            title: 'NewSessionInGroup',
            exclude: ['UUID'],
            optional: ['groupUUID']
          }),
        },
      },
    }) session: Omit<Session, 'UUID'>,
  ): Promise<Session> {
    return this.groupRepository.sessions(id).create(session);
  }

  @patch('/groups/{id}/sessions', {
    responses: {
      '200': {
        description: 'Group.Session PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Session, {partial: true}),
        },
      },
    })
    session: Partial<Session>,
    @param.query.object('where', getWhereSchemaFor(Session)) where?: Where<Session>,
  ): Promise<Count> {
    return this.groupRepository.sessions(id).patch(session, where);
  }

  @del('/groups/{id}/sessions', {
    responses: {
      '200': {
        description: 'Group.Session DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Session)) where?: Where<Session>,
  ): Promise<Count> {
    return this.groupRepository.sessions(id).delete(where);
  }
}
