import { TestBed, inject } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: new FakeAuthService() },
        AuthGuard
      ],
      imports: [HttpClientModule]
    });

    authService = TestBed.get(AuthService);
  });

  it("CanActivate: should return true if is logged in is false", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      guard.canActivate().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }
  ));

  it("CanActivate: should return false if is logged in is true", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      guard.canLoad().subscribe(res => {
        expect(res).toBeFalsy();
      });
    }
  ));

  it("CanLoad: should return true if is logged in is false", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      guard.canActivate().subscribe(res => {
        expect(res).toBeTruthy();
      });
    }
  ));

  it("CanLoad: should return false if is logged in is true", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      guard.canLoad().subscribe(res => {
        expect(res).toBeFalsy();
      });
    }
  ));
});
