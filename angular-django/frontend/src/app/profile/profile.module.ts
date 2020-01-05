import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileHomeComponent } from "./profile-home/profile-home.component";

import { ProfileService } from "./profile.service";

@NgModule({
  declarations: [ProfileComponent, ProfileHomeComponent],
  providers: [ProfileService],
  imports: [CommonModule, HttpClientModule, ProfileRoutingModule]
})
export class ProfileModule {}
