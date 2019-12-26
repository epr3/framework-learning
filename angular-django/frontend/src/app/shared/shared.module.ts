import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatToolbarModule } from "@angular/material/toolbar";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule],
  exports: [HeaderComponent, FooterComponent]
})
export class SharedModule {}
