import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Router } from "@angular/router";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { of } from "rxjs";

import { AuthService } from "../auth.service";

import { RegisterComponent } from "./register.component";

describe("RegisterComponent", () => {
  class FakeAuthService {
    register({
      email,
      password,
      password_confirmation
    }: {
      email: string;
      password: string;
      password_confirmation: string;
    }) {
      return of({ access_token: "test" });
    }
  }
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: FakeAuthService;
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
      providers: [{ provide: AuthService, useValue: new FakeAuthService() }],
      declarations: [RegisterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should be invalid when empty", () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it("email field validity", () => {
    let errors = {};
    const email = component.registerForm.controls["email"];
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

  it("password confirmation field validity", () => {
    let passwordErrors = {};
    let passwordConfirmationErrors = {};
    const password = component.registerForm.controls["password"];
    const password_confirmation =
      component.registerForm.controls["password_confirmation"];
    expect(password.valid).toBeFalsy();
    expect(password_confirmation.valid).toBeFalsy();

    passwordErrors = password.errors || {};
    passwordConfirmationErrors = password_confirmation.errors || {};
    expect(passwordErrors["required"]).toBeTruthy();
    expect(passwordConfirmationErrors["required"]).toBeTruthy();

    password.setValue("test");
    password_confirmation.setValue("t");
    passwordConfirmationErrors = password_confirmation.errors || {};
    expect(passwordConfirmationErrors["required"]).toBeFalsy();
    expect(passwordConfirmationErrors["mustMatch"]).toBeTruthy();

    password.setValue("test");
    password_confirmation.setValue("test");
    passwordConfirmationErrors = password_confirmation.errors || {};
    expect(passwordConfirmationErrors["required"]).toBeFalsy();
    expect(passwordConfirmationErrors["mustMatch"]).toBeFalsy();
  });

  it("submitting a form navigates to home", () => {
    router.navigateByUrl = jest.fn();
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls["email"].setValue("test@test.com");
    component.registerForm.controls["password"].setValue("123456789");
    component.registerForm.controls["password_confirmation"].setValue(
      "123456789"
    );
    expect(component.registerForm.valid).toBeTruthy();

    // Trigger the login function
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(router.navigateByUrl).toHaveBeenCalledWith("/");
  });
});
