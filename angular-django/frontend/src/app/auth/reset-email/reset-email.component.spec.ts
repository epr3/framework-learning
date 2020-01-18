import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { of } from "rxjs";

import { AuthService } from "../auth.service";

import { ResetEmailComponent } from "./reset-email.component";

describe("ResetEmailComponent", () => {
  class FakeAuthService {
    resetPasswordEmail(_: any) {
      return of(null);
    }
  }
  let component: ResetEmailComponent;
  let fixture: ComponentFixture<ResetEmailComponent>;
  let authService: FakeAuthService;
  let el: DebugElement[];

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
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: new FakeAuthService()
        }
      ],
      declarations: [ResetEmailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(ResetEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be invalid when empty", () => {
    expect(component.emailForm.valid).toBeFalsy();
  });

  it("email field validity", () => {
    let errors = {};
    const email = component.emailForm.controls["email"];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors["required"]).toBeTruthy();

    email.setValue("test");
    errors = email.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["email"]).toBeTruthy();

    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["email"]).toBeFalsy();
  });

  it("submitting a form changes the layout", () => {
    expect(component.emailForm.valid).toBeFalsy();
    el = fixture.debugElement.queryAll(By.css("#reset-success"));

    expect(el.length).toBe(0);

    component.emailForm.controls["email"].setValue("test@test.com");

    expect(component.emailForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.formSent).toBeTruthy();
    fixture.detectChanges();

    el = fixture.debugElement.queryAll(By.css("#reset-success"));

    expect(el.length).toBe(1);
  });
});
