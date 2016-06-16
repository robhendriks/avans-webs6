'use strict';

function EventManager() {
  this._events = {};
}

EventManager.prototype = {

  constructor: EventManager,

  on: function(name, callback) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    console.log('PUSH, DI BJOETON');
    this._events[name].push(callback);
  },

  fire: function(name, data) {
    if (!this._events[name]) { return; }
    this._events[name].forEach(function(callback) {
      callback(data);
    });
  },

  remove: function(name) {
    delete this._events[name];
  }

};

module.exports = EventManager;
