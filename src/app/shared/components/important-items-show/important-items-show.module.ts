import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { ImportantItemsShowComponent } from "./important-items-show.component";

@NgModule({
  declarations: [ImportantItemsShowComponent],
  imports: [CommonModule, FormsModule, MDBBootstrapModulesPro.forRoot()],
  exports: [ImportantItemsShowComponent],
})
export class ImportantItemsShowModule {}
