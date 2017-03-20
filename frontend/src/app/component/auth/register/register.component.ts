import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../service/auth.service';

interface UserInfo {
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public userInfo: UserInfo = {
    email: null,
    password: null
  };
  private register;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  regist() {
    this.register = this.authService.regist(this.userInfo)
      .subscribe(
      succ => this.router.navigateByUrl('/'),
      err => console.log(err),
    )
  }
  ngOnDestroy() {
    this.register.unsubscribe();
  }
}
