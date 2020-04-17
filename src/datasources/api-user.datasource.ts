import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'api_user',
  connector: 'rest',
  debug: 'true',
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        headers: {
          customAllow: 'true',
        },
        url:
          process.env.API_USER_URL +
          '/group-users?filter[include][][relation]=group&filter[where][userUUID]={userId}',
      },
      functions: {
        getUserGroups: ['userId'],
      },
    },
    {
      template: {
        method: 'GET',
        headers: {
          customAllow: 'true',
        },
        url: process.env.API_USER_URL + '/users?filter={query}',
      },
      functions: {
        getUsers: ['query'],
      },
    },
  ],
};

@lifeCycleObserver('datasource')
export class ApiUserDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'api_user';

  constructor(
    @inject('datasources.config.api_user', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
