import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SocketService } from '../../../service/socket.service';
import { AuthService } from '../../../service/auth.service';
import { ListService } from '../../../service/list.service';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.scss']
})
export class BuddyListComponent implements OnInit, OnDestroy {
  private room: string;
  private type: any;
  private sub: any;

  constructor(
    private _activitedRoute: ActivatedRoute,
    private socket: SocketService,
    private authService: AuthService,
    private listService: ListService,
  ) {
  }
  ngOnInit() {
    this.changeType();
    this.getFriendList();
  }

  // 更换列表
  changeType() {
    this.sub = this._activitedRoute.params
      .subscribe(
      params => console.log(params),
    );
  }

  // 获取好友列表
  getFriendList() {
    if (!this.listService.friendList.length) {
      this.listService.getFriendList();
    }
  }

  // 获取群组列表
  getGroupList() {
    if (!this.listService.groupList.length) {
      this.listService.getGroupList();
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
