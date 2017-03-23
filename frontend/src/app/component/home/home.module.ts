import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { DropdownModule } from 'primeng/primeng';

import { SocketService } from '../../service/socket.service';
import { SearchService } from '../../service/search.service';
import { ListService } from '../../service/list.service';

import { AutoScrollToBottomDirective } from '../../directive/auto-scroll-to-bottom.directive';

import { HomeComponent } from './home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddComponent } from './add/add.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DropdownModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    AutoScrollToBottomDirective,
    HomeComponent,
    SideBarComponent,
    BuddyListComponent,
    ChatRoomComponent,
    NotificationsComponent,
    AddComponent,
    SettingsComponent,
  ],
  exports: [
    HomeComponent,
    SideBarComponent,
    BuddyListComponent,
    ChatRoomComponent,
    AddComponent,
    SettingsComponent,
  ],
  providers: [
    SocketService,
    SearchService,
    ListService
  ],
})
export class HomeModule { }
