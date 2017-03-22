import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { ElementRef, EventEmitter } from '@angular/core';
import { Input, Output, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { SocketService } from '../../../service/socket.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnChanges {
  @Input() room: string;
  @Output() lastSend;
  private message: string;
  private messageList = [];
  private sendSub;

  constructor(
    private socket: SocketService,
    private authService: AuthService,
    private elementRef: ElementRef
  ) {
    // const sendMsg$ = Observable
    //   .fromEvent(elementRef.nativeElement, 'keyup')
    //   .filter((e: any) => e.keyCode === 13)
    //   .map(() => this.message)
    //   .subscribe(
    //   (date) => console.log(date),
    // )
  }

  ngOnInit() {
    // 初始化消息列表
    if (!this.socket.messageList[this.room]) {
      this.socket.messageList[this.room] = [];
    }

  }

  // 发消息对象更改时赋予新的消息列表
  ngOnChanges(changes: SimpleChanges) {
    if (!this.socket.messageList[this.room]) {
      this.socket.messageList[this.room] = [];
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

  sendMsg() {
    const msg = {
      from: this.authService.userInfo.id,
      to: this.room,
      date: new Date(),
      message: this.message
    };

    this.sendSub = this.socket.emit('sendMsg', msg)
      .subscribe(
      succ => { },
    );
    this.message = '';
    this.socket.messageList[this.room].push(msg);
  }

  trackByTime(index, msg) {
    return msg.date;
  }

}
