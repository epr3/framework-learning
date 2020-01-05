import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile/profile.component";
import { ProfileHomeComponent } from "./profile-home/profile-home.component";

import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        component: ProfileHomeComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
