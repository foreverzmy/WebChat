import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/observable';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  public socket = io('http://localhost:9000');

  constructor() { }

  on(eventName) {
    // this.socket.on(eventName, (...args) => {
    //   callback.apply(this.socket, args);
    // });
    const observable = new Observable(observer => {
      this.socket.on(eventName, data => {
        observer.next(data);
      });
    });
    return observable;
  }

  emit(eventName, msg) {
    // this.socket.emit(eventName, data, (...args) => {
    //   if (callback) {
    //     callback.apply(this.socket, args);
    //   }
    // });
    const observable = new Observable(observer => {
      this.socket.emit(eventName, msg, () => {
        observer.next('ok');
      });
    });
    return observable;
  }

}
