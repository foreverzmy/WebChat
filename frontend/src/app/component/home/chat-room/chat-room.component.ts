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

  public message: string;
  public messageList = [];
  public sendSub$;
  public sendMsg$ = new Subject<any>();
  public emojis = ['😂', '😄', '😏', '😇', '😅', '😌', '😘', '😗', '😍', '😀', '😜', '😎', '😊', '😳', '😅', '😱', '😒', '😔', '😷', '😩', '😤', '😱', '😕', '😵', '😣', '😰', '😷', '😴', '😬', '😭', '👻', '👽', '👿', '😈', '👹', '👺', '💀', '💩', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🙏', '🇨🇳'];
  public showEmoji = false;

  constructor(
    public socket: SocketService,
    public authService: AuthService,
    public listService: ListService,
    public elementRef: ElementRef,
  ) { }

  ngOnInit() {
    // 初始化消息列表
    if (!this.socket.messageList[this.room]) {
      this.socket.messageList[this.room] = [];
    }

    // 发送消息
    this.sendMsg();
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

  sendMsg() {
    this.sendMsg$.map(
      () => ({
        group: this.type === 'group' ? true : false,
        from: this.authService.userInfo.id,
        to: this.room,
        email: this.authService.userInfo.email,
        date: new Date(),
        content: this.message
      }))
      .do(x => this.message = '')
      .subscribe(msg => {
        this.socket.emit('sendMsg', msg)
          .subscribe(
          succ => { },
        );
        this.socket.messageList[this.room].push(msg);
      });
  }

  sendEmoji(item) {
    this.message = item;
    this.sendMsg$.next();
    this.showEmoji = false;
  }

  // 根据发送消息对象设置 class
  setClass(from) {
    if (from === this.authService.userInfo.id) {
      return 'my-msg';
    } else {
      return 'frd-msg';
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