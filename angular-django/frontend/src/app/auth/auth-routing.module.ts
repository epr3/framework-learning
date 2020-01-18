import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetEmailComponent } from "./reset-email/reset-email.component";

import { GuestGuard } from "./guest.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  {
    path: "reset-password",
    component: ResetEmailComponent,
    canActivate: [GuestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
