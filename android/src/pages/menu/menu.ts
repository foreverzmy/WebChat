import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  rootPage = TabsPage;
  pages: Array<{ title: string, component: Object }>;
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
  ) {
    this.pages = [
      { title: 'Page One', component: {} },
      { title: 'Page Two', component: {} }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

}
