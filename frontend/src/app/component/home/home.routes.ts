import { Route } from '@angular/router';

import { AuthGuardService } from '../../service/auth-guard.service';

import { HomeComponent } from './home.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddComponent } from './add/add.component';
import { SettingsComponent } from './settings/settings.component';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'chat/list', pathMatch: 'full' },
      { path: 'chat/:type', component: BuddyListComponent, },
      { path: 'notifications', component: NotificationsComponent, },
      { path: 'add', component: AddComponent, },
      { path: 'settings', component: SettingsComponent, },
    ]
  }
];
