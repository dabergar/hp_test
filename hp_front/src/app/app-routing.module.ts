import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ItemListComponent } from "./components/item/item-list/item-list.component";

const routes: Routes = [
  { path: "", component: ItemListComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
