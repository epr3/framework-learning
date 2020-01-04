import { TestBed, inject } from "@angular/core/testing";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Observable, of, BehaviorSubject, forkJoin } from "rxjs";

import { AuthService } from "./auth/auth.service";
import { TokenInterceptorService } from "./token-interceptor.service";

describe("TokenInterceptorService", () => {
  class FakeAuthService {
    logger = new BehaviorSubject<boolean>(false);

    isLoggedIn(): Observable<boolean> {
      return this.logger.asObservable();
    }

    deleteAuth() {}

    getAuth() {
      return "test";
    }

    refreshToken(): Observable<object> {
      return of({ access_token: "test" });
    }
  }

  let authService: FakeAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: new FakeAuthService() },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
        }
      ]
    });
    authService = TestBed.get(AuthService);
  });

  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

  it("should be created", () => {
    const service: TokenInterceptorService = TestBed.get(
      TokenInterceptorService
    );
    expect(service).toBeTruthy();
  });

  it("should add an authorization header", inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      authService.logger.next(true);

      http.get("/data").subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        r =>
          r.headers.has("Authorization") &&
          r.headers.get("Authorization") === `Bearer ${authService.getAuth()}`
      );
      expect(req.request.method).toEqual("GET");

      req.flush({ foo: "bar" });
      httpMock.verify();
    }
  ));

  it("should not add an authorization header if the url is login", inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      http.post("/login", { test: "test" }).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(r => {
        return !r.headers.has("Authorization");
      });
      expect(req.request.method).toEqual("POST");

      req.flush({ foo: "bar" });
      httpMock.verify();
    }
  ));

  it("should throw error if the url is refresh", inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      authService.deleteAuth = jest.fn();

      http.post("/refresh", { test: "test" }).subscribe();

      httpMock.expectOne("/refresh").error(new ErrorEvent("Forbidden"), {
        status: 403,
        statusText: "Forbidden"
      });

      expect(authService.deleteAuth).toHaveBeenCalled();

      httpMock.verify();
    }
  ));

  it("should throw an error if the url is login", inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      authService.refreshToken = jest.fn();

      http.post("/login", { test: "test" }).subscribe();

      httpMock.expectOne("/login").error(new ErrorEvent("Forbidden"), {
        status: 403,
        statusText: "Forbidden"
      });
      expect(authService.refreshToken).toHaveBeenCalledTimes(0);
      httpMock.verify();
    }
  ));

  it("should refresh the token on other calls", inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      authService.refreshToken = jest.fn();

      http.post("/data", { test: "test" }).subscribe();

      httpMock.expectOne("/data").error(new ErrorEvent("Forbidden"), {
        status: 403,
        statusText: "Forbidden"
      });
      expect(authService.refreshToken).toHaveBeenCalled();
      httpMock.verify();
    }
  ));

  it("should call refresh token once on multiple parallel calls", inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      authService.refreshToken = jest.fn();

      http.post("/data", { test: "test" }).subscribe();
      http.get("/test").subscribe();

      forkJoin([
        httpMock.expectOne("/data").error(new ErrorEvent("Forbidden"), {
          status: 403,
          statusText: "Forbidden"
        }),
        httpMock.expectOne("/test").error(new ErrorEvent("Forbidden"), {
          status: 403,
          statusText: "Forbidden"
        })
      ]);

      expect(authService.refreshToken).toHaveBeenCalledTimes(1);
      httpMock.verify();
    }
  ));
});
