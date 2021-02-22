import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { OnlinePaymentComponent } from "./shared/components/online-payment/online-payment.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "register",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "taavoon-shopping",
    loadChildren: () =>
      import("./taavoon-shopping/taavoon-shopping.module").then(
        (m) => m.TaavoonShoppingModule
      ),
  },
  {
    path: "home/online-payment/:itemId",
    component: OnlinePaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "not-found",
    component: NotFoundComponent,
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

