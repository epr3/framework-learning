import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [HttpClientModule]
    });
  });

  it("should ...", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
