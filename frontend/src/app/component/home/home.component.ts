import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocketService } from '../../service/socket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private socket: SocketService,
  ) {
  }

  ngOnInit() {
    console.log('kk');
    this.socket.emit('getUnderMessage', '', '');
    this.socket.on('allUnderMessage', messages => {
      console.log(messages);
    });
  }

}
