import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationsComponent } from "./notifications.component";
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, FormsModule, MDBBootstrapModulesPro.forRoot()],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}
