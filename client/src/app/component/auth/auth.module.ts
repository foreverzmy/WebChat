import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { LayoutModule } from 'ng2-flex-layout';
import 'hammerjs';

import { AuthService } from '../../service/auth.service';

@NgModule({
  imports: [
    RouterModule.forChild(AuthRoutes),
    FlexLayoutModule.forRoot(),
    CommonModule,
    FormsModule,
    MaterialModule,
    LayoutModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
    AUTH_PROVIDERS
  ],
  exports: [RouterModule]
})

export class AuthModule { }