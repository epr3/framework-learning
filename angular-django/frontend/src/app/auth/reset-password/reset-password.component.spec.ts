import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, convertToParamMap, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { ResetPasswordComponent } from "./reset-password.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { of } from "rxjs";

import { AuthService } from "../auth.service";

describe("ResetPasswordComponent", () => {
  class FakeAuthService {
    resetPassword(_: any) {
      return of(null);
    }
  }
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: FakeAuthService;
  let el: DebugElement[];
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: new FakeAuthService()
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                email: "test@test.com",
                token: "test"
              })
            }
          }
        }
      ],
      declarations: [ResetPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be invalid when empty", () => {
    expect(component.resetForm.valid).toBeFalsy();
  });

  it("password field validity", () => {
    let errors = {};
    const password = component.resetForm.controls["password"];
    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors["required"]).toBeTruthy();

    password.setValue("test");
    errors = password.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("submitting a form changes the layout", fakeAsync(() => {
    router.navigateByUrl = jest.fn();
    expect(component.resetForm.valid).toBeFalsy();
    el = fixture.debugElement.queryAll(By.css("#reset-success"));

    expect(el.length).toBe(0);

    component.resetForm.controls["password"].setValue("test");

    expect(component.resetForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.formSent).toBeTruthy();

    fixture.detectChanges();
    el = fixture.debugElement.queryAll(By.css("#reset-success"));

    expect(el.length).toBe(1);

    tick(5000);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith("/login");
    });
  }));
});
