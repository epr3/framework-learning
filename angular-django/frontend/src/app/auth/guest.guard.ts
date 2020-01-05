import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class GuestGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  private isNotLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(map(res => !res));
  }

  canLoad(): Observable<boolean> {
    return this.isNotLoggedIn();
  }

  canActivate(): Observable<boolean> {
    this.canLoad().subscribe(res => {
      if (!res) {
        this.router.navigateByUrl("/");
      }
    });
    return this.canLoad();
  }
}
