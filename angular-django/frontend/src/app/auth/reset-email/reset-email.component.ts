import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-reset-email",
  templateUrl: "./reset-email.component.html",
  styleUrls: ["./reset-email.component.scss"]
})
export class ResetEmailComponent implements OnInit {
  formSent = false;
  emailForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.emailForm.valid) {
      this.authService
        .resetPasswordEmail(this.emailForm.value)
        .subscribe(() => {
          this.formSent = true;
        });
    }
  }
}
