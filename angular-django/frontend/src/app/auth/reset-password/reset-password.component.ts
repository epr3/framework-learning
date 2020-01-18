import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  formSent = false;
  resetForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    token: ["", Validators.required],
    password: ["", Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.resetForm.setValue({
      token: this.route.snapshot.paramMap.get("token"),
      email: this.route.snapshot.paramMap.get("email"),
      password: ""
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.resetForm.value).subscribe(() => {
        this.formSent = true;
        setTimeout(() => {
          this.router.navigateByUrl("/login");
        }, 5000);
      });
    }
  }
}
