import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../service/auth.service';
import { AuthModel } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private registerCredentials: AuthModel = {
    email: '',
    password: '',
  };

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  private register() {
    this.auth.register(this.registerCredentials)
      .subscribe(
      allowed => console.log(allowed),
      err => console.log(err)
      );
  }
}
