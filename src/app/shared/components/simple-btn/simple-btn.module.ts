import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { FormsModule } from "@angular/forms";
import { SimpleBtnComponent } from "./simple-btn.component";

@NgModule({
  declarations: [SimpleBtnComponent],
  imports: [CommonModule, FormsModule, MDBBootstrapModulesPro.forRoot()],
  exports: [SimpleBtnComponent],
})
export class SimpleBtnModule {}
