import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';
import { AuthService } from '../../../service/auth.service';
import { ListService } from '../../../service/list.service';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.scss']
})
export class BuddyListComponent implements OnInit {
  private friendList = [];
  private room: string;

  constructor(
    private socket: SocketService,
    private authService: AuthService,
    private listService: ListService,
  ) {
    this.friendList = this.listService.friendList;
  }
  ngOnInit() {
    if (!this.friendList.length) {
      this.listService.getFriendList()
        .subscribe(
        succ => {
          this.listService.friendList = succ.list;
          this.friendList = succ.list;
        },
      );
    }
  }

  // 获取该联系人最后一条消息
  getLastMsg(id) {
    if (this.socket.messageList[id] && this.socket.messageList[id][this.socket.messageList[id].length - 1]) {
      return this.socket.messageList[id][this.socket.messageList[id].length - 1].content;
    } else {
      return null;
    }
  }
}
