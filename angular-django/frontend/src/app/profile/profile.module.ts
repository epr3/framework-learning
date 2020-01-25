import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileHomeComponent } from "./profile-home/profile-home.component";

import { ProfileService } from "./profile.service";
import { TokenInterceptorService } from "../token-interceptor.service";
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AddressFormComponent } from './address-form/address-form.component';

@NgModule({
  declarations: [ProfileComponent, ProfileHomeComponent, ProfileFormComponent, AddressFormComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    ProfileService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ProfileModule {}
