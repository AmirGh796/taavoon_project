import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { RangeBarMoneyComponent } from './range-bar-money.component';

@NgModule({
  declarations: [RangeBarMoneyComponent],
  imports: [CommonModule, FormsModule, MDBBootstrapModulesPro.forRoot()],
  exports: [RangeBarMoneyComponent],
})
export class RangeBarMoneyModule {}
