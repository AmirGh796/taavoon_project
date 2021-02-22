import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpServices } from "./shared/services/HttpServices.service";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { MDBBootstrapModulesPro, CollapseModule } from "ng-uikit-pro-standard";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { RegisterComponent } from "./shared/components/modals/register/register.component";
import { SearchingComponent } from "./shared/components/modals/searching/searching.component";
import { CookieService } from "ngx-cookie-service";
import { JwtModule } from "@auth0/angular-jwt";
import { ScrollUpComponent } from "./shared/components/scroll-up/scroll-up.component";
import { ShoppingBasketComponent } from "./shared/components/modals/shopping-basket/shopping-basket.component";
import { AuthService } from "./auth/auth.service";
import { ProgressPageComponent } from "./shared/components/modals/progress-page/progress-page.component";
import { AlertBoxComponent } from "./shared/components/modals/alert-box/alert-box.component";
import { FrameBoxComponent } from "./shared/components/modals/frame-box/frame-box.component";
import { CommonModule } from "@angular/common";
import { TokenInterceptor } from "./shared/services/interceptor";
import { HomeModule } from "./home/home.module";
import { environment } from "src/environments/environment";
import { ImagesBoxComponent } from "./shared/components/modals/images-box/images-box.component";
import { LiveChatModule } from "./shared/components/live-chat/live-chat.module";
import { NotificationsModule } from "./shared/components/notifications/notifications.module";
import { OnlinePaymentComponent } from "./shared/components/online-payment/online-payment.component";
import { OnlinePaymentService } from "./shared/components/online-payment/online-payment.service";
import { NgwWowModule } from 'ngx-wow';

export function tokenGetter() {
  var name = "tvnrntr_user_access_token" + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
  //return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJNVGcxTURreE1URXhNVEV4TVRFIiwiRnVsbE5hbWUiOiLYp9mF24zYsdit2LPbjNmGINmC2LHYqNin2YbbjCIsIlBob25lTnVtYmVyIjoiOTExMTExMTExMSIsIkVtYWlsIjoiYW1pckBnbWFpbC5jb20iLCJOYXRpb25hbENvZGUiOiIwMDIyMzg1MTkzIiwiU2V4Ijoi2YXYsdivIiwiVGVsZXBob25lIjoiMjIzMzQ0MjIiLCJBZGRyZXNzIjoi2YXYtNiu2LUg2YbYtNiv2YciLCJleHAiOjE1OTA3MTgwMjcsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzcxIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAifQ.fuFm5kkbbtuMmkjld-CkwScxTdp7lzCWk81n2fJ0wKU";
}
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    RegisterComponent,
    SearchingComponent,
    ScrollUpComponent,
    ProgressPageComponent,
    ShoppingBasketComponent,
    AlertBoxComponent,
    FrameBoxComponent,
    ImagesBoxComponent,
    OnlinePaymentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CollapseModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        throwNoTokenError: false,
        whitelistedDomains: [environment.jwtUrl],
      },
    }),
    MDBBootstrapModulesPro.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HomeModule,
    LiveChatModule,
    NotificationsModule,
    NgwWowModule
  ],
  entryComponents: [
    RegisterComponent,
    SearchingComponent,
    ShoppingBasketComponent,
    ProgressPageComponent,
    FrameBoxComponent,
    ImagesBoxComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    HttpServices,
    CookieService,
    AuthService,
    OnlinePaymentService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
