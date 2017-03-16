import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';

import { MenuPage } from '../menu/menu';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  loading: Loading;
  registerCredentials = { username: '', password: '' };
  constructor(
    private app: App,
    public navCtrl: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.showLoading();
    this.isLogin();
  }

  public isLogin() {
    this.auth.isLogin()
      .subscribe(allowed => {
        if (allowed.success === true) {
          this.app.getRootNav().push(MenuPage);
          this.loading.dismiss();
        }
      }, err => {
        this.showError(err)
      })
  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials)
      .subscribe(allowed => {
        if (allowed.success === true) {
          this.app.getRootNav().push(MenuPage);
          this.loading.dismiss();
        }
      }, err => {
        this.showError(err);
      })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt)
  }

}
