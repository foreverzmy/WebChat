import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, Output, SimpleChanges } from '@angular/core';

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
  ) {
  }

  ngOnInit() {
    if (this.room && this.socket.messageList[this.room]) {
      this.messageList = this.socket.messageList[this.room];
    } else {
      this.messageList = [];
    }

    // 接收消息
    this.socket.on('sendMsg')
      .subscribe(
      (msg: any) => {
        // 将消息存入数组
        if (!this.socket.messageList[msg.from]) {
          this.socket.messageList[msg.from] = [];
        }
        this.messageList.push(msg);
        this.socket.messageList[msg.from].push(msg);
      },
      err => console.log(err),
    );
  }

  // 发消息对象更改时赋予新的消息列表
  ngOnChanges(changes: SimpleChanges) {
    if (this.socket.messageList[this.room]) {
      this.messageList = this.socket.messageList[this.room];
    } else {
      this.messageList = [];
    }
  }

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
    this.sendSocket(msg);
    this.message = '';
    if (!this.socket.messageList[msg.to]) {
      this.socket.messageList[msg.to] = [];
    }
    this.messageList.push(msg);
    this.socket.messageList[msg.to].push(msg);
  }

  trackByTime(index, msg) {
    return msg.date;
  }

  sendSocket(msg) {
    this.sendSub = this.socket.emit('sendMsg', msg)
      .subscribe(
      succ => { },
    );
  }
}
