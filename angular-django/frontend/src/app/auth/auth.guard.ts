import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  CanActivateChild,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  private isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(map(res => !!res));
  }

  canLoad(): Observable<boolean> {
    return this.isLoggedIn();
  }

  canActivate(): Observable<boolean> {
    this.canLoad().subscribe(res => {
      if (!res) {
        this.router.navigateByUrl("/");
      }
    });
    return this.canLoad();
  }

  canActivateChild(): Observable<boolean> {
    this.canLoad().subscribe(res => {
      if (!res) {
        this.router.navigateByUrl("/");
      }
    });
    return this.canLoad();
  }
}
