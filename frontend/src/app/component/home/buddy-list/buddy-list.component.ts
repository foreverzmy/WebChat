import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.scss']
})
export class BuddyListComponent implements OnInit {
  constructor(
    private socket: SocketService,
    private authService: AuthService,
  ) {
  }
  ngOnInit() {
    if (this.authService.isLogin === true) {
      this.socket.emit('getUnreadMessage', this.authService.userInfo.id)
        .subscribe(() => console.log('ok'));
      this.socket.on('allUnredaMessage')
        .subscribe(msg => console.log(msg));
    }
  }
}
