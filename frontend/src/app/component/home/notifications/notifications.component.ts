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
  constructor(
    private socket: SocketService,
    private searchService: SearchService,
  ) {
  }
  ngOnInit() { }

  accept(id) {
    this.searchService.accetp(id)
      .subscribe(
      succ => console.log(succ),
      err => console.log(err),
    );
  }

}
