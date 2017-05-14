import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  public loginState: boolean;
  public auth: any;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isLogin === true) {
      return true;
    }
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
