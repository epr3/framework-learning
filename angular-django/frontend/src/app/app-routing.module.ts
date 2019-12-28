import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GuestGuard } from "./auth/guest.guard";

const routes: Routes = [
  {
    path: "auth",
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
