import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RoomComponent } from './component/room/room.component';
import { Routing } from './app.routes';
import { AutoScrollToBottomDirective } from './directive/auto-scroll-to-bottom.directive';
import { CtrlEnterBreakLineDirective } from './directive/ctrl-enter-break-line.directive';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomComponent,
    AutoScrollToBottomDirective,
    CtrlEnterBreakLineDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    MaterialModule.forRoot()
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
