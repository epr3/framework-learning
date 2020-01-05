import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

import {
  faUser,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import { AuthService } from "./../../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl("/");
    });
  }
}
