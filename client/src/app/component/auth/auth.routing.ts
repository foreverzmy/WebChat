import { Route } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const AuthRoutes: Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];
