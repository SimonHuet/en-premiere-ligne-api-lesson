import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'pg',
  connector: process.env.CONNECTOR,
  url: '',
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  localstorage: process.env.LOCALSTORAGE,
};

@lifeCycleObserver('datasource')
export class AuchanDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'AuchanDB';

  constructor(
    @inject('datasources.config.AuchanDB', {optional: true})
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
