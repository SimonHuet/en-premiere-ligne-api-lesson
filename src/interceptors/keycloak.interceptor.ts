import {
  globalInterceptor,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/context';
import {HttpErrors, RequestContext} from '@loopback/rest';
import Keycloak from '../keycloak-verify-modified';

const config = {
  authServerUrl: process.env.KEYCLOAK_URL,
  realm: 'master',
};

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('Keycloak', {tags: {name: 'Keycloak'}})
export class KeycloakInterceptor implements Provider<Interceptor> {
  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invocationCtx: InvocationContext | any,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    // eslint-disable-next-line no-useless-catch
    try {
      const keycloak = Keycloak(config);
      const requestCtx: RequestContext = invocationCtx.parent;
      const headers = requestCtx.request.headers;
      const route = requestCtx.request.url;

      if (route.search('explorer') === -1 && headers.customallow !== 'true') {
        const user = await keycloak.verifyOnline(headers.authorization);
        console.log(user);
      }
      // Add pre-invocation logic here
      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      if (err.response !== undefined)
        throw new HttpErrors[401](err.response.statusText);

      throw err;
    }
  }
}
