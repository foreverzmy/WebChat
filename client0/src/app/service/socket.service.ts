import { Injectable } from '@angular/core';

import * as io from 'socket.io-client'

@Injectable()
export class SocketService {

  socket = io('http://localhost:9000');
  constructor() { }

  on(eventName, callback) {
    this.socket.on(eventName, (...args) => {
      callback.apply(this.socket, args);
    })
  }

  emit(eventName, data, callback) {
    this.socket.emit(eventName, data, (...args) => {
      if (callback) {
        callback.apply(this.socket, args)
      }
    })
  }

}
