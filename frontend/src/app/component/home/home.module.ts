import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { DropdownModule } from 'primeng/primeng';

import { SocketService } from '../../service/socket.service';
import { SearchService } from '../../service/search.service';

import { HomeComponent } from './home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DropdownModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    HomeComponent,
    SideBarComponent,
    BuddyListComponent,
    GroupListComponent,
    ChatRoomComponent,
    NotificationsComponent,
    AddComponent,
  ],
  exports: [
    HomeComponent,
    SideBarComponent,
    BuddyListComponent,
    GroupListComponent,
    ChatRoomComponent,
    AddComponent,
  ],
  providers: [
    SocketService,
    SearchService
  ],
})
export class HomeModule { }
