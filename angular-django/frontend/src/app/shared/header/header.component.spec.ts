import { of, BehaviorSubject, Observable } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AuthService } from "./../../auth/auth.service";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  class FakeAuthService {
    logger = new BehaviorSubject<boolean>(false);

    isLoggedIn(): Observable<boolean> {
      return this.logger.asObservable();
    }

    logout(): Observable<object> {
      this.logger.next(false);
      return of({});
    }
  }

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: FakeAuthService;
  let el: DebugElement[];
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        FontAwesomeModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [{ provide: AuthService, useValue: new FakeAuthService() }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show one item when logged out", () => {
    el = fixture.debugElement.queryAll(By.css(".actions a"));

    expect(el.length).toBe(1);
  });

  it("should show two items when logged in", () => {
    authService.logger.next(true);
    fixture.detectChanges();

    el = fixture.debugElement.queryAll(By.css(".actions a"));

    expect(el.length).toBe(2);
  });

  it("should call auth service logout when logout is pressed", () => {
    router.navigateByUrl = jest.fn();
    authService.logger.next(true);
    fixture.detectChanges();

    el = fixture.debugElement.queryAll(By.css("#logout"));
    const spy = jest.spyOn(authService, "logout");
    el[0].triggerEventHandler("click", null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.isLoggedIn).toBeFalsy();
    expect(router.navigateByUrl).toHaveBeenCalledWith("/");
  });
});
