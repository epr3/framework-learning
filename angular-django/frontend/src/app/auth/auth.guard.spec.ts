import { TestBed, inject } from "@angular/core/testing";

import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { BehaviorSubject, Observable } from "rxjs";

import { AuthService } from "./auth.service";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  class FakeAuthService {
    logger = new BehaviorSubject<boolean>(false);

    isLoggedIn(): Observable<boolean> {
      return this.logger.asObservable();
    }
  }

  let authService: FakeAuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: new FakeAuthService() },
        AuthGuard
      ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule]
    });

    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it("CanActivate: should return true if is logged in is true", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      authService.logger.next(true);
      guard.canActivate().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }
  ));

  it("CanActivate: should return false if is logged in is false", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      router.navigateByUrl = jest.fn();
      guard.canActivate().subscribe(res => {
        expect(res).toBeFalsy();
        expect(router.navigateByUrl).toHaveBeenCalledWith("/");
      });
    }
  ));

  it("CanActivateChild: should return true if is logged in is true", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      authService.logger.next(true);
      guard.canActivateChild().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }
  ));

  it("CanActivateChild: should return false if is logged in is false", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      router.navigateByUrl = jest.fn();
      guard.canActivateChild().subscribe(res => {
        expect(res).toBeFalsy();
        expect(router.navigateByUrl).toHaveBeenCalledWith("/");
      });
    }
  ));

  it("CanLoad: should return false if is logged in is false", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      guard.canLoad().subscribe(res => {
        expect(res).toBeFalsy();
      });
    }
  ));

  it("CanLoad: should return true if is logged in is true", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      authService.logger.next(true);
      guard.canLoad().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }
  ));
});
