import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';

import { SocketService } from '../../../service/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {

  constructor(
    private socket: SocketService,
  ) {

  }

  ngOnInit() {

  }
}
