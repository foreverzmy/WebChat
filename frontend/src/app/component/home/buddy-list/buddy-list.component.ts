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

    if (this.authService.isLogin === true) {
      this.socket.emit('getUnreadMessage', this.authService.userInfo.id)
        .subscribe(() => console.log('ok'));
      this.socket.on('allUnredaMessage')
        .subscribe(msg => console.log(msg));
    }
  }
}
