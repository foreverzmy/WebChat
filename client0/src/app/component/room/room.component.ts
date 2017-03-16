import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { SocketService } from '../../service/socket.service'


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [SocketService]
})

export class RoomComponent implements OnInit {
  private messages = [];
  // private newMessage: string;
  @Input() newMessage: string;

  constructor(private socket: SocketService) { }

  ngOnInit() {
    this.socket.emit('getAllMessage', '', '');
    this.socket.on('allMessage', messages => {
      this.messages = messages;
    });
    this.socket.on('messageAdded', message => {
      this.messages.push(message);
    })
  }

  createMessage() {
    if (this.newMessage === '') {
      return;
    }
    this.socket.emit('createMessage', this.newMessage, '');
    this.newMessage = '';
  }
}
