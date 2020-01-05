import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { BaseHttp } from "../base-http";
import { Profile } from "./profile";

@Injectable({
  providedIn: "root"
})
export class ProfileService extends BaseHttp {
  service = "Profile Service";

  getProfile(): Observable<Profile> {
    return this.http
      .get<Profile>(`${this.url}/profile/`, this.httpOptions)
      .pipe(
        tap(() => this.log("fetched profile")),
        catchError(this.handleError<Profile>("fetch profile", null))
      );
  }
}
