import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, switchMap, filter, take, tap } from "rxjs/operators";

import { AuthService } from "./auth/auth.service";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    console.log(`TokenInterceptor: ${message}`);
    this.messageService.add(`TokenInterceptor: ${message}`);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.authService.isLoggedIn &&
      !request.url.includes("refresh") &&
      !request.url.includes("login") &&
      !request.url.includes("register")
    ) {
      request = this.addToken(request, this.authService.getAuth());
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (request.url.includes("login") || request.url.includes("register")) {
          return throwError(error);
        }

        if (request.url.includes("refresh")) {
          this.authService.deleteAuth();
          return throwError(error);
        }

        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handle403Error(request, next);
        } else {
          this.authService.deleteAuth();
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        tap(() => this.log("refreshing token from auth service")),
        switchMap((token: any) => {
          this.isRefreshing = false;
          if (!token) {
            return throwError(new Error("invalid token"));
          }
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token.access_token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        tap(() => this.log("refreshing token from subject")),
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt.access_token));
        })
      );
    }
  }
}
