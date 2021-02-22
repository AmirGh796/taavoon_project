import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { LiveChatComponent } from "./live-chat.component";
import { LiveChatService } from "./LiveChat.service";
import { HttpClientModule } from "@angular/common/http";
import { SafePipe } from "../../pipes/SafePipe .pipe";

@NgModule({
  declarations: [LiveChatComponent, SafePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    HttpClientModule
  ],
  exports: [LiveChatComponent],
  providers: [LiveChatService],
})
export class LiveChatModule {}
