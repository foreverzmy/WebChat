import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { SOCKET } from './api';
<<<<<<< HEAD
=======
import { SOCKET_PROD } from './api';
>>>>>>> d27ce0a763acba0b25b51616cb643736f0376775

@Injectable()
export class SocketService {
  public socket = io(SOCKET);

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
