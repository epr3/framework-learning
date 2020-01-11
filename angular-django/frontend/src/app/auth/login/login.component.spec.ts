import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { of } from "rxjs";

import { AuthService } from "../auth.service";

import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  class FakeAuthService {
    login({ email, password }: { email: string; password: string }) {
      return of({ access_token: "test" });
    }
  }

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: FakeAuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule
      ],
      providers: [{ provide: AuthService, useValue: new FakeAuthService() }],
      declarations: [LoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be invalid when empty", () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it("email field validity", () => {
    let errors = {};
    const email = component.loginForm.controls["email"];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["email"]).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["email"]).toBeFalsy();
  });

  it("submitting a form navigates to home", () => {
    router.navigateByUrl = jest.fn();
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls["email"].setValue("test@test.com");
    component.loginForm.controls["password"].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();

    // Trigger the login function
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(router.navigateByUrl).toHaveBeenCalledWith("/");
  });
});
