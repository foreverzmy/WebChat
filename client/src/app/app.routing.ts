import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { HomeRoutes } from './component/home/home.routing';

const routes: Route[] = [
  ...HomeRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
