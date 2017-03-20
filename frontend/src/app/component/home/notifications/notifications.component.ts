import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor(
    private socket: SocketService,
  ) {
  }
  ngOnInit() {
    this.socket.emit('getUnreadMessage', '')
      .subscribe(() => console.log('ok'));
    this.socket.on('allUnredaMessage')
      .subscribe(msg => console.log(msg));
  }
}
