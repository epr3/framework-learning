import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";

import { MessageService } from "./message.service";

@Injectable()
export class BaseHttp {
  public url = "http://localhost:8000";
  public service: string;
  public httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
    withCredentials: true
  };

  constructor(public http: HttpClient, public messageService: MessageService) {}

  log(message: string) {
    console.log(`${this.service}: ${message}`);
    this.messageService.add(`${this.service}: ${message}`);
  }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
