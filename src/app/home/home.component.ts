import { Component, HostListener, AfterViewInit, OnInit } from "@angular/core";
import { NgwWowService } from "ngx-wow";
import "jarallax";
import { HttpServices } from "../shared/services/HttpServices.service";
import { GetHomePageItemsModel } from "../shared/models/ContentObjects.model";
import {
  BankFacilitieItemsModel,
  CardSectionModel,
  LinksEventModel,
} from "../shared/models/MainSite.model";
import { Router } from "@angular/router";
import {
  SliderHomeModel,
  SliderShowModel,
} from "../shared/components/slider-show/slider-show.model";
import { FeturesSectionModel } from "../shared/components/fetures-show/fetures-show.model";
import { AuthService } from "../auth/auth.service";
import { UtilityFunctionsService } from "../shared/services/utility-functions.service";
declare var jarallax: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  loader: boolean;
  homePageItems: GetHomePageItemsModel;
  slidesConfig: SliderShowModel;
  userAccount: any;
  jarallaxSec3: string;

  constructor(
    private authService: AuthService,
    private httpService: HttpServices,
    private wowService: NgwWowService,
    private router: Router,
    public utilityFunctions: UtilityFunctionsService
  ) {
    this.wowService.init();
    this.homePageItems = new GetHomePageItemsModel();
    this.homePageItems.slides = new Array<SliderHomeModel>();
    this.homePageItems.fetures = new Array<FeturesSectionModel>();
    this.homePageItems.cards = new Array<CardSectionModel>();
    this.homePageItems.bankFacilitiesItems = new Array<BankFacilitieItemsModel>();

    this.slidesConfig = {
      animation: "slide",
      interval: 5000,
      isControls: true,
    };
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    // this.jarallaxSec3 = environment.jarallaxSec3;
    this.userAccount = this.authService.getUserAccount();
    window.scrollTo(0, 0);

    this.loader = true;
    this.httpService.getAllHomePageItems().subscribe((res) => {
      this.homePageItems = res;
      this.slidesConfig.slides = this.homePageItems.slides;
      this.loader = false;
      setTimeout(() => {
        this.onWindowResize();
      }, 500);
    });
  }

  @HostListener("window:resize")
  onWindowResize() {
    // if (window.innerWidth <= 768) {
    //   this.isVertical = true;
    //   this.stepperElement.style.textAlign = "start";
    // } else {
    //   this.isVertical = false;
    //   this.stepperElement.style.textAlign = "center";
    // }
    // let videoHeight = window.innerHeight;
    // let windowWidth = window.innerWidth;
    // let videoWidth = document.getElementById("video-slider").offsetWidth;
    // let marginLeftAdjust = (windowWidth - videoWidth) / 2;
    // let videoTag = document.getElementById("video-slider");
    // videoTag.style.height = videoHeight + "px";
    // videoTag.style.marginLeft = marginLeftAdjust + "px";
  }

  /*transformDropdowns() {
    const dropdownMenu = Array.from(
      this.el.nativeElement.querySelectorAll(".dropdown-menu")
    );
    const navHeight = this.nav.navbar.nativeElement.clientHeight + "px";

    dropdownMenu.forEach(dropdown => {
      this.renderer.setStyle(dropdown, "transform", `translateY(${navHeight})`);
    });
  }

  @HostListener("click", ["$event"])
  onClick(event: any) {
    const toggler = this.el.nativeElement.querySelector(".navbar-toggler");
    const togglerIcon = this.el.nativeElement.querySelector(
      ".navbar-toggler-icon"
    );
    if (event.target === toggler || event.target === togglerIcon) {
      console.log("test");
      setTimeout(() => {
        this.transformDropdowns();
      }, 351);
    }
  }

  @HostListener("document:scroll", ["$event"])
  onScroll() {
    this.transformDropdowns();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.transformDropdowns();
  }*/

  ngAfterViewInit() {
    jarallax(document.querySelectorAll(".jarallax"), {
      speed: 0.2,
    });
  }

  startView(): void {
    var screenHeight = screen.height;
    window.scrollTo(0, screenHeight - 150);
  }

  goToSlideLinks(event: LinksEventModel): void {
    if (event.sectionType === "slider") {
      this.httpService
        .saveUsersClickedOrView({
          forUserId: this.userAccount?.UserId,
          forSection: 2,
          forItemId: event.itemId.toString(),
        })
        .subscribe((_) => {});
    }

    switch (event.linkType) {
      case 0:
        window.open(event.linkUrl);
        break;
      case 1:
        this.router.navigateByUrl(event.linkUrl);
      default:
        break;
    }
  }
}
