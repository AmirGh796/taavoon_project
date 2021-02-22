import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing";
import { HomeService } from "./home.service";
import {
  MDBBootstrapModulesPro,
  MDBSpinningPreloader,
} from "ng-uikit-pro-standard";
import {
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperModule,
} from "ngx-swiper-wrapper";
import { NgwWowModule } from "ngx-wow";
import { CounterModule } from "angular-circle-counter";
import { LiveChatModule } from "../shared/components/live-chat/live-chat.module";
import { SliderShowModule } from "../shared/components/slider-show/slider-show.module";
import { FeturesShowModule } from "../shared/components/fetures-show/fetures-show.module";
import { UtilityFunctionsService } from "../shared/services/utility-functions.service";
import { ImportantItemsShowModule } from "../shared/components/important-items-show/important-items-show.module";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    NgwWowModule,
    SwiperModule,
    CounterModule,
    ReactiveFormsModule,
    LiveChatModule,
    SliderShowModule,
    FeturesShowModule,
    ImportantItemsShowModule,
  ],
  providers: [
    HomeService,
    MDBSpinningPreloader,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
    UtilityFunctionsService,
  ],
})
export class HomeModule {}
