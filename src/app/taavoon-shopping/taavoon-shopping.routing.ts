import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TaavoonShoppingComponent } from "./taavoon-shopping.component";
import { MainCatComponent } from "./main-cat/main-cat.component";
import { SubCatComponent } from "./sub-cat/sub-cat.component";
import { ViewProductComponent } from "./view-product/view-product.component";

const routes: Routes = [
  {
    path: "",
    component: TaavoonShoppingComponent,
  },
  {
    path: "main-cat/:mc",
    component: MainCatComponent,
  },
  {
    path: "sub-cat/:sc",
    component: SubCatComponent,
  },
  {
    path: "view-product/:product",
    component: ViewProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaavoonShoppingRoutingModule {}
