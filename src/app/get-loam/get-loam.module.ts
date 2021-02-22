import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MDBBootstrapModulesPro, ToastModule } from "ng-uikit-pro-standard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GetLoamService } from "./get-loam.service";
import { GetLoamComponent } from "./get-loam.component";
import { GetLoamRoutingModule } from "./get-loam.routing";
import { RangeBarMoneyModule } from "../shared/components/ranges/range-bar-money/range-bar-money.module";
import { ConfirmGetLoamComponent } from "./confirm-get-loam/confirm-get-loam.component";
import { AuthGuard } from "../auth/auth.guard";
import { SuccessGetLoamComponent } from "./confirm-get-loam/success-get-loam/success-get-loam.component";
import { ModalsConfigurationsService } from "../shared/services/ObjectsConfig.service";
import { SimpleBtnModule } from "../shared/components/simple-btn/simple-btn.module";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { UtilityFunctionsService } from "../shared/services/utility-functions.service";

@NgModule({
  declarations: [
    GetLoamComponent,
    ConfirmGetLoamComponent,
    SuccessGetLoamComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GetLoamRoutingModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    RangeBarMoneyModule,
    SimpleBtnModule,
    DpDatePickerModule,
  ],
  providers: [
    GetLoamService,
    AuthGuard,
    ModalsConfigurationsService,
    UtilityFunctionsService,
  ],
})
export class GetLoamModule {}
