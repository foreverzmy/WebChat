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
  private friendList: any[];
  private groupList: any[];

  constructor(
    private _activitedRoute: ActivatedRoute,
    private socket: SocketService,
    private authService: AuthService,
    private listService: ListService,
  ) {
  }
  ngOnInit() {
    this.changeType();
  }

  // 更换列表
  changeType() {
    this.sub = this._activitedRoute.params
      .subscribe((params: any) => {
        this.type = params.type;
        switch (params.type) {
          case 'list':
          case 'friend':
            this.getFriendList();
            break;
          case 'group':
            this.getGroupList();
            break;
        }
      });
  }

  // 获取好友列表
  getFriendList() {
    this.groupList = [];
    if (!this.listService.friendList.length) {
      this.listService.getFriendList()
        .subscribe(
        succ => {
          this.listService.friendList = succ.content;
          this.friendList = this.listService.friendList;
        },
        err => console.log(err),
      );
    }
    this.friendList = this.listService.friendList;
  }

  // 获取群组列表
  getGroupList() {
    this.friendList = [];
    if (!this.listService.groupList.length) {
      this.listService.getGroupList()
        .subscribe(
        succ => {
          this.listService.groupList = succ.content;
          this.groupList = this.listService.groupList;
        },
        err => console.log(err),
      );
    }
    this.groupList = this.listService.groupList;
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
