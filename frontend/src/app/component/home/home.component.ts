import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService, PushNotificationsService } from 'angular2-notifications';

import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public getAllMsg;
  public options = {
    position: ['top', 'right'],
    timeOut: 3000,
    lastOnBottom: false
  };

  constructor(
    public router: Router,
    public socket: SocketService,
    public notice: NotificationsService,
    public pushNotifications: PushNotificationsService
  ) { }

  ngOnInit() {
    this.pushNotifications.requestPermission();
    this.showLoad();
    // 接收消息
    this.socket.on('sendMsg')
      .subscribe(
      (msg: any) => {
        // 初始化消息列表
        if (msg.group === false) {
          if (!this.socket.messageList[msg.from]) {
            this.socket.messageList[msg.from] = [];
          }
          // 将消息存入数组
          this.socket.messageList[msg.from].push(msg);
        } else {
          if (!this.socket.messageList[msg.to]) {
            this.socket.messageList[msg.to] = [];
          }
          // 将消息存入数组
          this.socket.messageList[msg.to].push(msg);
        }

        this.showNesMessage(msg);
      },
      err => console.log(err),
    );

    // 接收通知
    this.socket.on('notice')
      .subscribe(
      data => {
        // 显示通知
        this.showNewNitice();
        this.socket.noticeList.push(data);
      },
      err => console.log(err)
      );
  }

  showNewNitice() {
    this.notice.info(
      '好友通知',
      '您收到新的好友通知',
      {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 10
      }
    );
  }

  showNesMessage(msg) {
    // this.pushNotifications.create('消息通知',
    //   { body: `${msg.email}：${msg.content}` })
    //   .subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    //   );
    this.notice.info(
      '消息通知',
      `${msg.email}：${msg.content}`,
      {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 30
      }
    );
  }

  showLoad() {
    this.notice.success(
      '认证通知',
      '登录成功！',
      {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 10
      }
    );
  }

  ngOnDestroy() {
    // this.getAllMsg.unsubscribe();
  }
}
