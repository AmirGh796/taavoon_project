import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaavoonShoppingComponent } from "./taavoon-shopping.component";
import { FormsModule } from "@angular/forms";
import { TaavoonShoppingRoutingModule } from "./taavoon-shopping.routing";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { TaavoonShoppingService } from "./taavoon-shopping.service";
import {
  SwiperModule,
  SwiperConfigInterface,
  SWIPER_CONFIG,
} from "ngx-swiper-wrapper";
import { CounterModule } from "angular-circle-counter";
import { MainCatComponent } from "./main-cat/main-cat.component";
import { SubCatComponent } from "./sub-cat/sub-cat.component";
import { ViewProductComponent } from "./view-product/view-product.component";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};
@NgModule({
  declarations: [
    TaavoonShoppingComponent,
    MainCatComponent,
    SubCatComponent,
    ViewProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaavoonShoppingRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    SwiperModule,
    CounterModule,
  ],
  providers: [
    TaavoonShoppingService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class TaavoonShoppingModule {}
