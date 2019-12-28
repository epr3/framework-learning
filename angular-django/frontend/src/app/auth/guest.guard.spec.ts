import { TestBed, inject } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: new FakeAuthService() },
        GuestGuard
      ],
      imports: [HttpClientModule]
    });

    authService = TestBed.get(AuthService);
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
      guard.canLoad().subscribe(res => {
        expect(res).toBeFalsy();
      });
    }
  ));

  it("CanLoad: should return true if is logged in is false", inject(
    [GuestGuard],
    (guard: GuestGuard) => {
      guard.canActivate().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }
  ));

  it("CanLoad: should return false if is logged in is true", inject(
    [GuestGuard],
    (guard: GuestGuard) => {
      guard.canLoad().subscribe(res => {
        expect(res).toBeFalsy();
      });
    }
  ));
});
