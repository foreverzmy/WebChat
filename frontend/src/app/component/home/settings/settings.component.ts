import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';
import { SearchService } from '../../../service/search.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public msgs = [];
  constructor(
    public socket: SocketService,
    public searchService: SearchService,
  ) {
  }
  ngOnInit() {
    this.socket.on('notice')
      .subscribe(
      succ => this.msgs.push(succ),
      err => console.log(err)
      );
  }

}
