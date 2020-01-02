import { Injectable } from "@angular/core";
import { CanActivate, CanLoad } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  private isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(map(res => !!res));
  }

  canLoad(): Observable<boolean> {
    return this.isLoggedIn();
  }

  canActivate(): Observable<boolean> {
    return this.canLoad();
  }
}
