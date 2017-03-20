import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SocketService } from '../../service/socket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private getAllMsg;

  constructor(
    private router: Router,
    private socket: SocketService,
  ) {
  }

  ngOnInit() {
    // console.log('kk');
    // this.socket.emit('getUnderMessage', '', '');
    // this.socket.on('allUnderMessage', messages => {
    //   console.log(messages);
    // });
    // this.getAllMsg = this.socket.emit('getUnderMessage', '')
    //   .subscribe(msg => console.log(msg));
  }
  ngOnDestroy() {
    // this.getAllMsg.unsubscribe();
  }
}
