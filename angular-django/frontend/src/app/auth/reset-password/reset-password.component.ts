import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  passwordReset = false;
  resetForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    token: ["", Validators.required],
    password: ["", Validators.required]
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.resetForm.value).subscribe(() => {
        this.passwordReset = true;
      });
    }
  }
}
