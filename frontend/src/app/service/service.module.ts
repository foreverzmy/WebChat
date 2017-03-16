import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  providers: [AuthGuardService],
  exports: []
})
export class ServiceModule {

  constructor( @Optional() @SkipSelf() parentModule: ServiceModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

