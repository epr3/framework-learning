import { Component, OnInit } from "@angular/core";

import { FormBuilder, Validators } from "@angular/forms";

import { Profile } from "../profile";
import { ProfileService } from "../profile.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-home.component.html",
  styleUrls: ["./profile-home.component.scss"]
})
export class ProfileHomeComponent implements OnInit {
  isProfileDataEditing = false;
  profile: Profile;
  profileDataForm = this.fb.group({
    email: [
      {
        value: "",
        disabled: !this.isProfileDataEditing
      },
      [Validators.required, Validators.email]
    ],
    name: [
      {
        value: "",
        disabled: !this.isProfileDataEditing
      },
      Validators.required
    ],
    surname: [
      {
        value: "",
        disabled: !this.isProfileDataEditing
      },
      Validators.required
    ],
    telephone: [
      {
        value: "",
        disabled: !this.isProfileDataEditing
      },
      Validators.required
    ]
  });

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      this.profile = profile;
      if (this.profile) {
        this.profileDataForm.setValue({
          email: this.profile.user.email,
          telephone: this.profile.telephone,
          name: this.profile.name,
          surname: this.profile.surname
        });
      }
    });
  }

  onSubmit() {
    console.log(this.profileDataForm.value);
  }

  toggleEditing() {
    this.isProfileDataEditing = !this.isProfileDataEditing;
    Object.values(this.profileDataForm.controls).forEach(item =>
      this.isProfileDataEditing ? item.enable() : item.disable()
    );
  }
}
