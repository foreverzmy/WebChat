import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { SOCKET } from './api';
// import { SOCKET_PROD } from './api';

@Injectable()
export class SocketService {
  public socket = io(SOCKET);

  public messageList = {
  };
  public noticeList = [];

  constructor() { }

  public on(eventName) {
    const observable = new Observable(observer => {
      this.socket.on(eventName, data => {
        observer.next(data);
      });
    });
    return observable;
  }

  public emit(eventName, msg) {
    const observable = new Observable(observer => {
      this.socket.emit(eventName, msg, () => {
        observer.next('ok');
      });
    });
    return observable;
  }

}
