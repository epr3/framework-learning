import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

import { AuthService } from "./../auth/auth.service";

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class SharedModule {}
