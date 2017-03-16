import { Route } from '@angular/router';

import { AuthGuardService } from '../../service/auth-guard.service';

import { HomeComponent } from './home.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';
import { GroupListComponent } from './group-list/group-list.component';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuardService]
    children: [
      { path: '', component: BuddyListComponent, },
      { path: 'groupList', component: GroupListComponent, }
    ]
  }
];
