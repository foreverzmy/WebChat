import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutes } from './auth.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from '../../service/auth.service';

@NgModule({
  imports: [
    RouterModule.forChild(AuthRoutes),
    CommonModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
  ],
  exports: [RouterModule]
})

export class AuthModule { }