import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';
import { SearchService } from '../../../service/search.service';
import { ListService } from '../../../service/list.service';

@Component({
  selector: 'app-notice',
  template: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NotificationsComponent implements OnInit {
  private _defaults = {
    text: 'default message',
    cssClass: ''
  };

  text: string;
  messages: NoticeInterface[] = [];
  _grayOut: boolean = false;

  constructor(
    private socket: SocketService,
    private searchService: SearchService,
    private listService: ListService,
  ) { }

  ngOnInit() {

  }


}
