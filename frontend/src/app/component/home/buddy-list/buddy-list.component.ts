import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.scss']
})
export class BuddyListComponent implements OnInit {
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
