/**
  @module ember-jsonapi-resources
  @submodule authorization
**/

import Ember from 'ember';

/**
  A Mixin class for storage of credential/token uses with a HTTP Authorization request-header

  The default solution is to use localStorage['AuthorizationHeader'] for the credential

  @class AuthorizationMixin
*/

export default Ember.Mixin.create({

  /**
    The name of the Authorization request-header field

    @property authorizationHeaderField
    @type String
    @required
  */
  authorizationHeaderField: 'Authorization',

  /**
    The name key, stored locally, that references the Authorization request-header credential/token

    @property authorizationHeaderStorageKey
    @type String
    @required
  */
  authorizationHeaderStorageKey: 'AuthorizationHeader',

  /**
    Authentication credentials/token used with HTTP authentication

    @property authorizationCredential
    @type String
    @required
  */
  authorizationCredential: Ember.computed({
    get(key) {
      key = this.get('authorizationHeaderStorageKey');
      return window[this._storage].getItem(key);
    },
    set(key, value) {
      key = this.get('authorizationHeaderStorageKey');
      window[this._storage].setItem(key, value);
      return value;
    }
  }),

  /**
    Storage type localStorage or sessionStorage

    @property _storage
    @type String
    @private
  */
  _storage: ['localStorage', 'sessionStorage'][0]

});
