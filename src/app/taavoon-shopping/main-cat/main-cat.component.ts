import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { moneySeparator } from 'src/app/shared/UtilityFunctions';

@Component({
  selector: "app-main-cat",
  templateUrl: "./main-cat.component.html",
  styleUrls: ["./main-cat.component.scss"],
})
export class MainCatComponent implements OnInit, AfterViewInit {
  mCHover: boolean;
  mainCategoryPanel: HTMLElement;
  footerElement: HTMLElement;

  carouselSlides: any = [
    {
      bgImage: "../../../assets/images/slides/main-category/slide-test-1.jpg",
      title: "فروش از 20 تا 50 درصد در هر رایانه لوحی!",
      description:
        "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید",
    },
    {
      bgImage: "../../../assets/images/slides/main-category/slide-test-2.jpg",
      title: "فروش از 20 تا 50 درصد در هر رایانه لوحی!",
      description:
        "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید",
    },
  ];

  config: SwiperConfigInterface = {
    slidesPerView: 1,
    navigation: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
    autoplay: true,
    updateOnWindowResize: true,
    setWrapperSize: true,
    roundLengths: true,
    autoHeight: false,
    spaceBetween: 0,
  };

  bestSellerConfig: SwiperConfigInterface = {
    slidesPerView: 4,
    navigation: true,
    pagination: false,
    loop: true,
    autoplay: true,
    updateOnWindowResize: true,
    setWrapperSize: true,
    roundLengths: true,
    autoHeight: false,
    spaceBetween: 0,
  };

  constructor() {}

  ngOnInit(): void {
    this.initData();
  }

  ngAfterViewInit(): void {
    this.initStyles();
    this.footerElement = document.getElementsByTagName("footer")[0];
  }

  initData(): void {
    this.mCHover = false;
    this.mainCategoryPanel = document.getElementById("m-c-panel");
  }

  initStyles(): void {
    let element: any = document.getElementsByClassName(
      "mdb-accordion-indicator"
    );
    for (let index = 0; index < element.length; index++) {
      element[index].style.right = "unset";
      element[index].style.left = "0px";
    }

    let elementQuery: any = document.querySelectorAll(
      "mdb-accordion-item-head h5"
    );
    for (let index = 0; index < elementQuery.length; index++) {
      elementQuery[index].style.fontSize = "16px";
      elementQuery[index].style.fontWeight = "500";
    }
  }

  setNumberOfSlides(): number {
    if (screen.width < 991) {
      return 1;
    } else if (screen.width >= 991 && screen.width < 1199) {
      return 2;
    } else if (screen.width >= 1200) {
      return 3;
    }
  }

  convertMoney(price: number): string {
    return moneySeparator(price.toString()) + " تومان";
  }

  onIndexChange(event: any) {}
}
