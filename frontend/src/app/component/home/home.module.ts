import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { HomeComponent } from './home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListComponent } from './list/list.component';
import { GroupListComponent } from './group-list/group-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    SideBarComponent,
    ListComponent,
    GroupListComponent,
  ],
  exports: [
    HomeComponent,
    SideBarComponent,
    ListComponent,
    GroupListComponent
  ]
})
export class HomeModule { }
