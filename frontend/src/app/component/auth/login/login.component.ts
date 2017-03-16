import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  public userInfo: UserInfo = {
    email: null,
    password: null
  };
  public returnUrl: string;
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
    // if (this.authService.isLogin === true) {
    //   this.router.navigateByUrl('/');
    // }
    this.authService.getUser().subscribe(
      succ => { this.router.navigateByUrl('/'); },
      err => console.log(err),
    );
  }

  login(): void {
    this.authService.login(this.userInfo)
      .subscribe(
      succ => {
        this.authService.isLogin = true;
        this.router.navigateByUrl(this.returnUrl ? this.returnUrl : '/');
      },
      err => console.log(err)
      );
  }


}
