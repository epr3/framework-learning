import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { Observable, of } from "rxjs";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { Profile } from "../profile";
import { ProfileService } from "../profile.service";

import { ProfileFormComponent } from "./profile-form.component";

describe("ProfileFormComponent", () => {
  const fakeProfile = {
    name: "test",
    surname: "test",
    telephone: "test",
    user: {
      email: "test@test.com"
    }
  };
  class FakeProfileService {
    putProfile = jest.fn();

    getProfile(): Observable<Profile> {
      return of(fakeProfile);
    }
  }

  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;
  let profileService: FakeProfileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: new FakeProfileService()
        }
      ],
      declarations: [ProfileFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    profileService = TestBed.get(ProfileService);
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load profile on init", () => {
    component.ngOnInit();

    expect(component.profile.user.email).toBe(fakeProfile.user.email);
    expect(component.profileDataForm.get("email").value).toBe(
      fakeProfile.user.email
    );
  });

  it("should have all inputs disabled on load", () => {
    Object.values(component.profileDataForm.controls).forEach(
      (item: FormControl) => {
        expect(item.disabled).toBeTruthy();
      }
    );
  });

  it("should enable all inputs on toggleEditing", () => {
    component.toggleEditing();

    Object.values(component.profileDataForm.controls).forEach(
      (item: FormControl) => {
        expect(item.disabled).toBeFalsy();
      }
    );
  });

  it("should be invalid when empty", () => {
    expect(component.profileDataForm.valid).toBeFalsy();
  });

  it("should call the profile service on form submission", () => {
    profileService.putProfile.mockReturnValue(of(fakeProfile));
    component.toggleEditing();

    component.profileDataForm.controls["name"].setValue(fakeProfile.name);
    component.profileDataForm.controls["surname"].setValue(fakeProfile.surname);
    component.profileDataForm.controls["email"].setValue(
      fakeProfile.user.email
    );
    component.profileDataForm.controls["telephone"].setValue(
      fakeProfile.telephone
    );

    expect(component.profileDataForm.valid).toBeTruthy();

    component.onSubmit();

    expect(profileService.putProfile).toHaveBeenCalledWith(fakeProfile);
  });
});
