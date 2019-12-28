import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksListComponent } from "./books-list/books-list.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: BooksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
