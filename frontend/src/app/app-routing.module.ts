import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutes } from './component/home/home.routes';


export const routes: Routes = [
  ...HomeRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
