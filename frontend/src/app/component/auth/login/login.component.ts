import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../service/auth.service';

interface UserInfo {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public userInfo: UserInfo = {
    email: null,
    password: null
  };
  public returnUrl: string;
  private getUser;
  private loginConn;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  ngOnInit() {
    this.getUser = this.authService.getUser()
      .subscribe(
      succ => { this.router.navigateByUrl('/'); },
      err => console.log(err),
    );
  }

  login(): void {
    this.loginConn = this.authService.login(this.userInfo)
      .subscribe(
      succ => {
        this.authService.isLogin = true;
        this.authService.userInfo = succ.userInfo;
        this.router.navigateByUrl(this.returnUrl ? this.returnUrl : '/');
      },
      err => console.log(err)
      );
  }

  ngOnDestroy() {
    this.getUser.unsubscribe();
    if (this.loginConn) {
      this.loginConn.unsubscribe();
    }
  }
}
