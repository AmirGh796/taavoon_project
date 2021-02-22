import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { RegisterFormComponent } from "./register-form.component";
import { DpDatePickerModule } from "ng2-jalali-date-picker";

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    DpDatePickerModule,
  ],
  exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
