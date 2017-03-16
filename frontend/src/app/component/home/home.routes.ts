import { Route } from '@angular/router';

import { AuthGuardService } from '../../service/auth-guard.service';

import { HomeComponent } from './home.component';
import { ListComponent } from './list/list.component';
import { GroupListComponent } from './group-list/group-list.component';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuardService]
    children: [
      { path: 'list', component: ListComponent, },
      { path: 'groupList', component: GroupListComponent, }
    ]
  }
];
