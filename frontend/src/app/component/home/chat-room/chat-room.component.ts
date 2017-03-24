import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { ElementRef, EventEmitter } from '@angular/core';
import { Input, Output, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SocketService } from '../../../service/socket.service';
import { AuthService } from '../../../service/auth.service';
import { ListService } from '../../../service/list.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnChanges {
  @Input() room: string;
  @Input() type: string;
  @Output() lastSend;

  private message: string;
  private messageList = [];
  private sendSub$;
  private sendMsg$ = new Subject<any>();

  constructor(
    private socket: SocketService,
    private authService: AuthService,
    private listService: ListService,
    private elementRef: ElementRef,
  ) {

  }

  ngOnInit() {
    // 初始化消息列表
    if (!this.socket.messageList[this.room]) {
      this.socket.messageList[this.room] = [];
    }

    // 发送消息
    this.sendMsg$.map(
      (e: any) => ({
        from: this.authService.userInfo.id,
        to: this.room,
        date: new Date(),
        content: this.message
      }))
      .do(x => this.message = '')
      .subscribe(msg => {
        if (this.type === 'group') {
          this.socket.emit('sendGroupMsg', msg)
            .subscribe(
            succ => { },
          );
        } else {
          this.socket.emit('sendMsg', msg)
            .subscribe(
            succ => { },
          );
        }
        this.socket.messageList[this.room].push(msg);
      });
  }

  // 发消息对象更改时赋予新的消息列表
  ngOnChanges(changes: SimpleChanges) {
    if (!this.socket.messageList[this.room]) {
      this.socket.messageList[this.room] = [];
    }
    // 当列表类型变化时
    for (const propName in changes) {
      if (propName === 'type') {

      }
    }
  }

  // 根据发送消息对象设置 class
  setClass(from) {
    if (from === this.room) {
      return 'frd-msg';
    } else {
      return 'my-msg';
    }
  }

  getName(id) {
    if (this.authService.userInfo.id === id) {
      return this.authService.userInfo.email;
    } else {
      for (const frd of this.listService.friendList) {
        if (frd._id === id) {
          return frd.email;
        }
      }
    }
  }

  trackByTime(index, msg) {
    return msg.date;
  }

}
