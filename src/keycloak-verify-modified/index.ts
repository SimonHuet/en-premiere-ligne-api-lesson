/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-var */
/* eslint-disable prefer-rest-params */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

const _axios = _interopRequireDefault(require('axios'));

const _ramda = require('ramda');

function _interopRequireDefault(obj) {
  return obj?.__esModule ? obj : {default: obj};
}

const verifyOnline = function verifyOnline(_ref) {
  const realm = _ref.realm,
    authServerUrl = _ref.authServerUrl;
  return function (accessToken) {
    const options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _axios['default']
      .get(
        ''
          .concat(authServerUrl, '/auth/realms/')
          .concat(options.realm || realm, '/protocol/openid-connect/userinfo'),
        {
          headers: {
            Authorization: 'Bearer '.concat(accessToken),
          },
        },
      )
      .then(_ramda.prop('data'))
      .then(makeUser);
  };
};

var makeUser = function makeUser(_ref2) {
  const sub = _ref2.sub,
    preferred_username = _ref2.preferred_username,
    email_verified = _ref2.email_verified,
    resource_access = _ref2.resource_access,
    email = _ref2.email,
    name = _ref2.name;
  return {
    id: sub,
    userName: preferred_username,
    emailVerified: email_verified,
    resourceAccess: resource_access,
    email: email,
    name: name,
  };
};

const Keycloak = function Keycloak(config) {
  return {
    verifyOnline: verifyOnline(config),
  };
};

const _default = Keycloak;
export default _default;
