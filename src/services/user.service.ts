import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ApiUserDataSource} from '../datasources';

export interface User {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserGroups(userId: string): Promise<any[]>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUsers(query: string): Promise<any[]>;
}

export class UserProvider implements Provider<User> {
  constructor(
    // api_user must match the name property in the datasource json file
    @inject('datasources.api_user')
    protected dataSource: ApiUserDataSource = new ApiUserDataSource(),
  ) {}

  value(): Promise<User> {
    return getService(this.dataSource);
  }
}
