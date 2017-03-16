import { NgModule } from '@angular/core';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { MaterialModule } from '@angular/material';
import { LayoutModule } from 'ng2-flex-layout';
import 'hammerjs';

import { AuthModule } from '../auth/auth.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    AuthModule,
    MaterialModule,
    LayoutModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [AUTH_PROVIDERS]
})
export class HomeModule { }