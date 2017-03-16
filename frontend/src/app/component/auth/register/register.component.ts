import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit {
  public userInfo: UserInfo = {
    email: null,
    password: null
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  regist() {
    this.authService.regist(this.userInfo)
      .subscribe(
      succ => this.router.navigateByUrl('/'),
      err => console.log(err),
    )
  }

}
