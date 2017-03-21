import { Route } from '@angular/router';

import { AuthGuardService } from '../../service/auth-guard.service';

import { HomeComponent } from './home.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddComponent } from './add/add.component';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: BuddyListComponent, },
      { path: 'groupList', component: GroupListComponent, },
      { path: 'notifications', component: NotificationsComponent, },
      { path: 'add', component: AddComponent, },
    ]
  }
];
