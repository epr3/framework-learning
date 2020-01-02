import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GuestGuard } from "./auth/guest.guard";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./books/books.module").then(mod => mod.BooksModule),
    data: { preload: true }
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then(mod => mod.ProfileModule),
    canLoad: [AuthGuard]
  },
  {
    path: "",
    pathMatch: "full",
    loadChildren: () =>
      import("./auth/auth.module").then(mod => mod.AuthModule),
    canLoad: [GuestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
