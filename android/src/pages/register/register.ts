import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { username: '', password: '' };

  constructor(public navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController) { }

  public register() {
    this.auth.register(this.registerCredentials)
      .subscribe(allowed => {
        if (allowed.success === true) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      }, err => {
        this.showPopup("Error", err);
      })
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    })
    alert.present();
  }

}
