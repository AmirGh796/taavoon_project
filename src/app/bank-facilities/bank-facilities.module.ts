import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BankFacilitiesRoutingModule } from "./bank-facilities.routing";
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { BankFacilitiesComponent } from "./bank-facilities.component";
import { BankFacilitiesService } from "./bank-facilities.service";
import { BankFacilitiesDetailsComponent } from "./bank-facilities-details/bank-facilities-details.component";
import { ModalsConfigurationsService } from "../shared/services/ObjectsConfig.service";
import { BankFacilitiesFormComponent } from "./bank-facilities-details/bank-facilities-form/bank-facilities-form.component";
import { RegisterFormModule } from "../shared/components/register-form/register-form.module";

@NgModule({
  declarations: [
    BankFacilitiesComponent,
    BankFacilitiesDetailsComponent,
    BankFacilitiesFormComponent,
  ],
  imports: [
    CommonModule,
    BankFacilitiesRoutingModule,
    FormsModule,
    MDBBootstrapModulesPro.forRoot(),
    RegisterFormModule,
  ],
  providers: [BankFacilitiesService, ModalsConfigurationsService],
})
export class BankFacilitiesModule {}
