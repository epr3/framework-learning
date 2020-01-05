import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileHomeComponent } from "./profile-home/profile-home.component";

@NgModule({
  declarations: [ProfileComponent, ProfileHomeComponent],
  imports: [CommonModule, ProfileRoutingModule]
})
export class ProfileModule {}
