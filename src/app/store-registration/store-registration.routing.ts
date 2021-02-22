import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StoreRegistrationComponent } from "./store-registration.component";

const routes: Routes = [
  {
    path: "",
    component: StoreRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRegistrationRoutingModule {}
