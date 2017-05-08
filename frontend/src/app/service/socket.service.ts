import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { SOCKET } from './api';
<<<<<<< HEAD
=======
// import { SOCKET_PROD } from './api';
>>>>>>> 913942fa06b9693d4b040b4ef3ffd0d2fcea42c9

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
