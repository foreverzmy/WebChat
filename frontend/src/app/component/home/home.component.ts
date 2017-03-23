import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { SocketService } from '../../service/socket.service';
import { ListService } from '../../service/list.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private getAllMsg;

  constructor(
    private router: Router,
    private authService: AuthService,
    private socket: SocketService,
    private listService: ListService,
  ) {
  }

  ngOnInit() {

    // 接收消息
    this.socket.on('sendMsg')
      .subscribe(
      (msg: any) => {
        // 初始化消息列表
        if (!this.socket.messageList[msg.from]) {
          this.socket.messageList[msg.from] = [];
        }
        // 将消息存入数组
        this.socket.messageList[msg.from].push(msg);
      },
      err => console.log(err),
    );

    // 接收通知
    this.socket.on('notice')
      .subscribe(
      succ => this.socket.noticeList.push(succ),
      err => console.log(err)
      );
  }
  ngOnDestroy() {
    // this.getAllMsg.unsubscribe();
  }
}
