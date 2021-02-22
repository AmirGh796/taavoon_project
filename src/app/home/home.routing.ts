import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "get-loan",
    loadChildren: () =>
      import("../get-loam/get-loam.module").then((m) => m.GetLoamModule),
  },
  {
    path: "bank-facilities",
    loadChildren: () =>
      import("../bank-facilities/bank-facilities.module").then(
        (m) => m.BankFacilitiesModule
      ),
  },
  {
    path: "questions-guide",
    loadChildren: () =>
      import("../questions-guide/questions-guide.module").then(
        (m) => m.QuestionsGuideModule
      ),
  },
  // {
  //   path: "store-registration",
  //   loadChildren: () =>
  //     import("../store-registration/store-registration.module").then(
  //       (m) => m.StoreRegistrationModule
  //     ),
  // },
  {
    path: "contact-us",
    loadChildren: () =>
      import("../contact-us/contact-us.module").then((m) => m.ContactUsModule),
  },
  {
    path: "about-us",
    loadChildren: () =>
      import("../about-us/about-us.module").then((m) => m.AboutUsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
