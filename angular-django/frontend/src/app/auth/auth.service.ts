import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./../message.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "http://localhost:8000";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  storeAuth(accessToken: string) {
    localStorage.setItem("bookStore:access", accessToken);
  }

  login(email: string, password: string): Observable<object> {
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
        catchError(this.handleError<object>("login"))
      );
  }
}
