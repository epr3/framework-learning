import { TestBed } from "@angular/core/testing";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { ProfileService } from "./profile.service";

describe("ProfileService", () => {
  const fakeProfile = {
    name: "",
    surname: "",
    telephone: "",
    user: {
      email: "test@test.com"
    }
  };

  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });
    service = TestBed.get(ProfileService);
    service.log = jest.fn();
    service.handleError = jest.fn();
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get the profile and return it", () => {
    service.getProfile().subscribe(res => {
      expect(res).toBe(fakeProfile);
      expect(service.log).toHaveBeenCalled();
    });

    const req = httpMock.expectOne("http://localhost:8000/profile/");
    expect(req.request.method).toBe("GET");
    req.flush(fakeProfile);
  });

  it("should log error when you get the profile", () => {
    service.getProfile().subscribe(_ => {
      expect(service.handleError).toHaveBeenCalledWith("fetch profile");
      expect(service.log).toHaveBeenCalled();
    });

    const req = httpMock.expectOne("http://localhost:8000/profile/");

    req.error(new ErrorEvent("Forbidden"), {
      status: 400,
      statusText: "error"
    });
  });

  it("should update the profile and return it", () => {
    service.putProfile(fakeProfile).subscribe(res => {
      expect(res).toBe(fakeProfile);
      expect(service.log).toHaveBeenCalled();
    });

    const req = httpMock.expectOne("http://localhost:8000/profile/");
    expect(req.request.method).toBe("PUT");
    req.flush(fakeProfile);
  });

  it("should log error when you update", () => {
    service.putProfile(fakeProfile).subscribe(_ => {
      expect(service.handleError).toHaveBeenCalledWith("update profile");
      expect(service.log).toHaveBeenCalled();
    });

    const req = httpMock.expectOne("http://localhost:8000/profile/");

    req.error(new ErrorEvent("Forbidden"), {
      status: 400,
      statusText: "error"
    });
  });
});
