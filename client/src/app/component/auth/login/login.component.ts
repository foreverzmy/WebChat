import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../service/auth.service';
import { AuthModel } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginCredentials: AuthModel = {
    email: '',
    password: '',
  };
  constructor(
    public auth: AuthService,
    private router: Router
  ) { }



  public login(): void {
    this.auth.login(this.loginCredentials)
      .subscribe(
      allowed => this.router.navigate(['/']),
      err => console.log(err)
      );
  }
  private register(): void {
    this.router.navigate(['/auth/register']);
  }
}
