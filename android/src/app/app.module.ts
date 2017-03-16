import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { provideAuth } from 'angular2-jwt'

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { MenuPage } from '../pages/menu/menu'
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register'

import { AuthService } from '../providers/auth-service'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    MenuPage,
    TabsPage,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    MenuPage,
    TabsPage,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }, AuthService,
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'Bearer',
      tokenName: 'id_token', tokenGetter() { return localStorage.getItem('id_token') },
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: false,
      noTokenScheme: false
    })
  ]
})
export class AppModule { }
