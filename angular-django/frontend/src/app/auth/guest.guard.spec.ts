import { TestBed, async, inject } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";

import { GuestGuard } from "./guest.guard";

describe("GuestGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestGuard],
      imports: [HttpClientModule]
    });
  });

  it("should ...", inject([GuestGuard], (guard: GuestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
