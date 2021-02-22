import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutUsComponent } from "./about-us.component";
import { AboutUsRoutingModule } from "./about-us.routing";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { FormsModule } from "@angular/forms";
import { AboutUsService } from "./about-us.service";

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    FormsModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  providers: [AboutUsService],
})
export class AboutUsModule {}
