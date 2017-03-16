import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuardService } from '../../service/auth-guard.service';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }
];
