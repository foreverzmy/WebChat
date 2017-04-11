import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';
import { SearchService } from '../../../service/search.service';
import { ListService } from '../../../service/list.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  private type: string;

  constructor(
    private socket: SocketService,
    private searchService: SearchService,
    private listService: ListService,
  ) { }

  ngOnInit() {

  }

  accept(id) {
    this.searchService.accetp(id)
      .subscribe(
      succ => {
        this.listService.getFriendList()
          .subscribe(
          data => {
            this.listService.friendList = data.content;
          },
          err => console.log(err),
        );
      },
      err => console.log(err),
    );
  }

}
