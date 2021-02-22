import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { AuthComponent } from "./auth.component";
import { AuthService } from "./auth.service";
import { AuthRoutingModule } from "./auth.routing";
import { ModalsConfigurationsService } from "../shared/services/ObjectsConfig.service";
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [AuthService, CookieService, ModalsConfigurationsService],
})
export class AuthModule {}
