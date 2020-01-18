import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    service.log = jest.fn();
    service.storeAuth = jest.fn();
    service.deleteAuth = jest.fn();
    service.handleError = jest.fn();
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should login and store the access token", () => {
    service
      .login({ email: "test@test.com", password: "test" })
      .subscribe(res => {
        expect(res).toBe({ access_token: "test" });
        expect(service.log).toHaveBeenCalled();
        expect(service.storeAuth).toHaveBeenCalled();
        service.isLoggedIn().subscribe(bool => {
          expect(bool).toBeTruthy();
        });
      });

    const req = httpMock.expectOne("http://localhost:8000/login/");
    expect(req.request.method).toBe("POST");
    req.flush({ access_token: "test" });
  });

  it("should log error and catch it on login", () => {
    service.login({ email: "test@test.com", password: "test" }).subscribe(_ => {
      expect(service.handleError).toHaveBeenCalledWith("login");
      expect(service.log).toHaveBeenCalled();
      expect(service.storeAuth).toHaveBeenCalledTimes(0);
      service.isLoggedIn().subscribe(bool => {
        expect(bool).toBeFalsy();
      });
    });

    const req = httpMock.expectOne("http://localhost:8000/login/");

    req.error(new ErrorEvent("Forbidden"), {
      status: 400,
      statusText: "error"
    });
  });

  it("should register and store the access token", () => {
    service
      .register({
        email: "test@test.com",
        password: "test",
        password_confirmation: "test"
      })
      .subscribe(res => {
        expect(res).toBe({ access_token: "test" });
        expect(service.log).toHaveBeenCalled();
        expect(service.storeAuth).toHaveBeenCalled();
        service.isLoggedIn().subscribe(bool => {
          expect(bool).toBeTruthy();
        });
      });

    const req = httpMock.expectOne("http://localhost:8000/register/");
    expect(req.request.method).toBe("POST");
    req.flush({ access_token: "test" });
  });

  it("should log error and catch it on register", () => {
    service
      .register({
        email: "test@test.com",
        password: "test",
        password_confirmation: "test"
      })
      .subscribe(_ => {
        expect(service.handleError).toHaveBeenCalledWith("register");
        expect(service.log).toHaveBeenCalled();
        expect(service.storeAuth).toHaveBeenCalledTimes(0);
        service.isLoggedIn().subscribe(bool => {
          expect(bool).toBeFalsy();
        });
      });

    const req = httpMock.expectOne("http://localhost:8000/register/");

    req.error(new ErrorEvent("Forbidden"), {
      status: 400,
      statusText: "error"
    });
  });

  it("should logout and delete the access token", () => {
    service.logout().subscribe(res => {
      expect(res).toBeFalsy();
      expect(service.log).toHaveBeenCalled();
      expect(service.deleteAuth).toHaveBeenCalled();
      service.isLoggedIn().subscribe(bool => {
        expect(bool).toBeFalsy();
      });
    });

    const req = httpMock.expectOne("http://localhost:8000/logout/");
    expect(req.request.method).toBe("DELETE");
    req.flush(null);
  });

  it("should log error and catch it on logout", () => {
    service.logout().subscribe(_ => {
      expect(service.handleError).toHaveBeenCalledWith("logout");
      expect(service.log).toHaveBeenCalled();
      expect(service.deleteAuth).toHaveBeenCalledTimes(0);
      service.isLoggedIn().subscribe(bool => {
        expect(bool).toBeFalsy();
      });
    });

    const req = httpMock.expectOne("http://localhost:8000/logout/");

    req.error(new ErrorEvent("Forbidden"), {
      status: 400,
      statusText: "error"
    });
  });

  it("should post request for password reset email", () => {
    service
      .resetPasswordEmail({
        email: "test@test.com"
      })
      .subscribe(_ => {
        expect(service.log).toHaveBeenCalled();
      });

    const req = httpMock.expectOne("http://localhost:8000/password-reset/");
    expect(req.request.method).toBe("POST");
    req.flush(null);
  });

  it("should log error and catch it on reset password email", () => {
    service
      .resetPasswordEmail({
        email: "test@test.com"
      })
      .subscribe(_ => {
        expect(service.handleError).toHaveBeenCalledWith(
          "password reset email"
        );
        expect(service.log).toHaveBeenCalled();
      });

    const req = httpMock.expectOne("http://localhost:8000/password-reset/");

    req.error(new ErrorEvent("Forbidden"), {
      status: 400,
      statusText: "error"
    });
  });

  it("should post request for password reset", () => {
    service
      .resetPassword({
        email: "test@test.com",
        token: "test",
        password: "test"
      })
      .subscribe(_ => {
        expect(service.log).toHaveBeenCalled();
      });

    const req = httpMock.expectOne(
      "http://localhost:8000/password-reset/done/"
    );
    expect(req.request.method).toBe("POST");
    req.flush(null);
  });

  it("should log error and catch it on reset password", () => {
    service
      .resetPassword({
        email: "test@test.com",
        token: "test",
        password: "test"
      })
      .subscribe(_ => {
        expect(service.handleError).toHaveBeenCalledWith("password reset");
        expect(service.log).toHaveBeenCalled();
      });

    const req = httpMock.expectOne(
      "http://localhost:8000/password-reset/done/"
    );

    req.error(new ErrorEvent("Forbidden"), {
      status: 400,
      statusText: "error"
    });
  });
});
