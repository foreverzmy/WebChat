import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  private loginState: boolean;
  private auth: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isLogin) {
      return true;
    }
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
