import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';
import { SearchService } from '../../../service/search.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  private msgs = [];
  constructor(
    private socket: SocketService,
    private searchService: SearchService,
  ) {
  }
  ngOnInit() {
    this.socket.emit('getUnreadMessage', '')
      .subscribe(() => console.log('ok'));
    this.socket.on('allUnredaMessage')
      .subscribe(msg => console.log(msg));
    this.socket.on('notice')
      .subscribe(
      succ => this.msgs.push(succ),
      err => console.log(err)
      );
  }

  accept(id) {
    this.searchService.accetp(id)
      .subscribe(
      succ => console.log(succ),
      err => console.log(err),
    );
  }

}
