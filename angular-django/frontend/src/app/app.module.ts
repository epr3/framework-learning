import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, GuestLayoutComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
