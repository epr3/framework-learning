import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, tap, shareReplay } from "rxjs/operators";

import { BaseHttp } from "../base-http";

@Injectable({
  providedIn: "root"
})
export class AuthService extends BaseHttp {
  private logger = new BehaviorSubject<boolean>(
    !!localStorage.getItem("bookStore:access")
  );
  service = "Auth Service";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
    withCredentials: true
  };

  getAuth() {
    return localStorage.getItem("bookStore:access");
  }

  storeAuth(accessToken: string) {
    localStorage.setItem("bookStore:access", accessToken);
    this.logger.next(true);
  }

  deleteAuth() {
    localStorage.removeItem("bookStore:access");
    this.logger.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  refreshToken(): Observable<object> {
    return this.http
      .get<{ access_token: string }>(`${this.url}/refresh/`, this.httpOptions)
      .pipe(
        tap(() => this.log("refreshed token")),
        tap(({ access_token }) => {
          this.storeAuth(access_token);
        }),
        catchError(this.handleError<object>("refresh token")),
        shareReplay()
      );
  }

  login({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Observable<object> {
    return this.http
      .post<{ access_token: string }>(
        `${this.url}/login/`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        tap(() => this.log("logged in")),
        tap(({ access_token }) => {
          this.storeAuth(access_token);
        }),
        catchError(this.handleError<object>("login")),
        shareReplay()
      );
  }

  logout(): Observable<object> {
    return this.http
      .delete(`${this.url}/logout/`, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bookStore:access")}`
        }),
        withCredentials: true
      })
      .pipe(
        tap(() => this.log("logged out")),
        tap(() => {
          this.deleteAuth();
        }),
        catchError(this.handleError<object>("logout")),
        shareReplay()
      );
  }
}
