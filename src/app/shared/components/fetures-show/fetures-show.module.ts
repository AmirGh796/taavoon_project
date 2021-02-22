import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { FeturesShowComponent } from "./fetures-show.component";

@NgModule({
  declarations: [FeturesShowComponent],
  imports: [CommonModule, FormsModule, MDBBootstrapModulesPro.forRoot()],
  exports: [FeturesShowComponent],
})
export class FeturesShowModule {}
