import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { StoreRegistrationRoutingModule } from "./store-registration.routing";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { StoreRegistrationComponent } from "./store-registration.component";
import { StoreRegistrationService } from "./store-registration.service";
import { NgMarqueeModule } from "ng-marquee";

@NgModule({
  declarations: [StoreRegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    StoreRegistrationRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  providers: [StoreRegistrationService],
})
export class StoreRegistrationModule {}
