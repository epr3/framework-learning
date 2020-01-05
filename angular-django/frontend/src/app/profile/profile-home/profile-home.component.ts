import { Component, OnInit } from "@angular/core";

import { Profile } from "../profile";
import { ProfileService } from "../profile.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-home.component.html",
  styleUrls: ["./profile-home.component.scss"]
})
export class ProfileHomeComponent implements OnInit {
  profile: Profile;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService
      .getProfile()
      .subscribe(profile => (this.profile = profile));
  }
}
