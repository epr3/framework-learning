import { TestBed, inject } from "@angular/core/testing";

import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { BehaviorSubject, Observable } from "rxjs";

import { AuthService } from "./auth.service";

import { GuestGuard } from "./guest.guard";

describe("GuestGuard", () => {
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
        GuestGuard
      ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule]
    });

    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it("CanActivate: should return true if is logged in is false", inject(
    [GuestGuard],
    (guard: GuestGuard) => {
      guard.canActivate().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }
  ));

  it("CanActivate: should return false if is logged in is true", inject(
    [GuestGuard],
    (guard: GuestGuard) => {
      router.navigateByUrl = jest.fn();
      authService.logger.next(true);
      guard.canActivate().subscribe(res => {
        expect(res).toBeFalsy();
        expect(router.navigateByUrl).toHaveBeenCalledWith("/");
      });
    }
  ));

  it("CanLoad: should return true if is logged in is false", inject(
    [GuestGuard],
    (guard: GuestGuard) => {
      guard.canLoad().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }
  ));

  it("CanLoad: should return false if is logged in is true", inject(
    [GuestGuard],
    (guard: GuestGuard) => {
      authService.logger.next(true);
      guard.canLoad().subscribe(res => {
        expect(res).toBeFalsy();
      });
    }
  ));
});
