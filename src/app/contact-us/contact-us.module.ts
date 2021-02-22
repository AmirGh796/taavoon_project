import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactUsComponent } from "./contact-us.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { ContactUsRoutingModule } from "./contact-us.routing";
import { ContactUsService } from "./contact-us.service";
import { ModalsConfigurationsService } from "../shared/services/ObjectsConfig.service";

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactUsRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  providers: [ContactUsService, ModalsConfigurationsService],
})
export class ContactUsModule {}
