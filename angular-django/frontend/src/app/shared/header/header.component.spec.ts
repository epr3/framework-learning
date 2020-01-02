import { of, BehaviorSubject, Observable } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { MatToolbarModule } from "@angular/material/toolbar";

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
      return of({})
    }
  }

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: FakeAuthService;
  let el: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: new FakeAuthService() }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show two items when logged out", () => {
    el = fixture.debugElement.queryAll(By.css(".actions a"));

    expect(el.length).toBe(2);
  });

  it("should show two items when logged in", () => {
    authService.logger.next(true);
    fixture.detectChanges();

    el = fixture.debugElement.queryAll(By.css(".actions a"));

    expect(el.length).toBe(2);
  });

  it("should call auth service logout when logout is pressed", () => {
    authService.logger.next(true);
    fixture.detectChanges();

    el = fixture.debugElement.queryAll(By.css("#logout"));
    const spy = jest.spyOn(authService, "logout");
    el[0].triggerEventHandler("click", null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.isLoggedIn).toBeFalsy();
  });
});
