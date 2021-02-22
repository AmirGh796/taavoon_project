import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GetLoamComponent } from "./get-loam.component";
import { ConfirmGetLoamComponent } from "./confirm-get-loam/confirm-get-loam.component";
import { AuthGuard } from "../auth/auth.guard";
import { SuccessGetLoamComponent } from "./confirm-get-loam/success-get-loam/success-get-loam.component";

const routes: Routes = [
  {
    path: "",
    component: GetLoamComponent,
  },
  {
    path: "confirm-loan",
    component: ConfirmGetLoamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "success-get-loan/:trackingCode",
    component: SuccessGetLoamComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetLoamRoutingModule {}
