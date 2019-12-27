import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";

import { map } from "rxjs/operators";

import { AuthService } from "./../../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
