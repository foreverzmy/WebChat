import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { RoomComponent } from './component/room/room.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'room',
    component: RoomComponent
  },
  {
    path: 'todo',
    redirectTo: 'todo'
  }
];
export const Routing = RouterModule.forRoot(routes);
