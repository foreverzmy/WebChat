import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  public socket = io('http://115.115.39.224:9000');

  public messageList = {
  };
  public noticeList = [];

  constructor() { }

  on(eventName) {
    const observable = new Observable(observer => {
      this.socket.on(eventName, data => {
        observer.next(data);
      });
    });
    return observable;
  }

  emit(eventName, msg) {
    const observable = new Observable(observer => {
      this.socket.emit(eventName, msg, () => {
        observer.next('ok');
      });
    });
    return observable;
  }

}
