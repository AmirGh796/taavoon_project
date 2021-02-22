import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { SliderShowComponent } from "./slider-show.component";

@NgModule({
  declarations: [SliderShowComponent],
  imports: [CommonModule, FormsModule, MDBBootstrapModulesPro.forRoot()],
  exports: [SliderShowComponent],
})
export class SliderShowModule {}
