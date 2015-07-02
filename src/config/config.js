'use strict';

var _              = require('underscore');
var ConfigProfiles = require('./profiles');

/**
 * Wraps the raw config object adding a bit of safety
 * and collecting the configuration profiles
 *
 * @param {Object} data
 */
module.exports = function Config(data) {
  var profiles = new ConfigProfiles(data.profiles || {});

  /**
   * Checks if a key exists
   *
   * @param {String} key
   * @return {Boolean}
   */
  this.has = function(key) {
    return typeof data[key] !== 'undefined';
  };

  /**
   * Gets the config value by its key
   *
   * @param {String} key
   * @return {*} the config value
   */
  this.get = function(key) {
    if (!this.has(key)) throw new Error('"' + key + '" is not a valid config option');
    return data[key];
  };

  /**
   * Sets a new value for a given key
   *
   * @param {String} key
   * @param {*} value
   */
  this.set = function(key, value) {
    if (!this.has(key)) throw new Error('"' + key + '" is not a valid config option');
    data[key] = value;
  };

  /**
   * Serializes the data
   *
   * @return {String}
   */
  this.serialize = function() {
    return JSON.stringify(data, null, 2);
  };
  
  this.getGlobals = function() {
    return _.omit(data, 'profiles');
  };

  /**
   * Gets the configuration profiles
   *
   * @return {ConfigProfiles}
   */
  this.getProfiles = function() {
    return profiles;
  };

};
