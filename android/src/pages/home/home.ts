import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private auth: AuthService) {
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

}
