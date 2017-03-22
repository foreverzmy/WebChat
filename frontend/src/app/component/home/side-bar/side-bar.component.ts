import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';
import { SocketService } from '../../../service/socket.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  constructor(
    private socket: SocketService,
    private authService: AuthService,
  ) { }
  ngOnInit() {
    if (this.authService.isLogin === true) {
      this.socket.emit('getUnreadMessage', this.authService.userInfo.id)
        .subscribe(() => console.log('ok'));
      this.socket.on('allUnredaMessage')
        .subscribe(msg => console.log(''));
    }
  }
}
