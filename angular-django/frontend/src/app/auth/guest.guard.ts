import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map(res => {
        if (!res) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
