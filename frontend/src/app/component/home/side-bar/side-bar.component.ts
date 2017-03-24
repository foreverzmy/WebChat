import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';
import { SocketService } from '../../../service/socket.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(
    private socket: SocketService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    if (this.authService.isLogin === true) {
      this.socket.emit('getUnreadMsg', this.authService.userInfo.id)
        .subscribe();

      this.socket.on('allUnreadMsg')
        .subscribe((msgs: any) => {
          // 将消息存入数组
          msgs.message.forEach((msg: any) => {
            let frdId = '';  // 好友 id
            if (msg.from === this.authService.userInfo.id) {
              frdId = msg.to;
            } else {
              frdId = msg.from;
            }
            if (!this.socket.messageList[frdId]) {
              this.socket.messageList[frdId] = [];
            }
            this.socket.messageList[frdId].push(msg);
          });

          msgs.groupMsg.forEach((msg: any) => {
            if (!this.socket.messageList[msg.to]) {
              this.socket.messageList[msg.to] = [];
            }
            this.socket.messageList[msg.to].push(msg);
          })
        });
    }
  }

  ngOnDestroy() {

  }
}
