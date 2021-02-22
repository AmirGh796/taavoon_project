import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BankFacilitiesComponent } from "./bank-facilities.component";
import { BankFacilitiesDetailsComponent } from "./bank-facilities-details/bank-facilities-details.component";
import { BankFacilitiesFormComponent } from "./bank-facilities-details/bank-facilities-form/bank-facilities-form.component";

const routes: Routes = [
  {
    path: "",
    component: BankFacilitiesComponent,
  },
  {
    path: "bank-facilities-details/:itemId",
    component: BankFacilitiesDetailsComponent,
  },
  {
    path: "bank-facilities-details/:itemId/forms",
    component: BankFacilitiesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankFacilitiesRoutingModule {}
