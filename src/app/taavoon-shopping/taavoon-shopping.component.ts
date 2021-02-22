import { Component, OnInit } from "@angular/core";
import { moneySeparator } from "../shared/UtilityFunctions";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
  selector: "app-taavoon-shopping",
  templateUrl: "./taavoon-shopping.component.html",
  styleUrls: ["./taavoon-shopping.component.scss"],
})
export class TaavoonShoppingComponent implements OnInit {
  mCHover: boolean;

  carouselSlides: any = [
    {
      image: "../../assets/images/slides/1000024897.jpg",
      discount: true,
      title: "فروش از 20 تا 50 درصد در هر رایانه لوحی!",
      description:
        "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید",
      subImages: [
        "../../assets/images/slides/details/1.jpg",
        "../../assets/images/slides/details/2.jpg",
        "../../assets/images/slides/details/3.jpg",
        "../../assets/images/slides/details/4.jpg",
      ],
    },
    {
      image: "../../assets/images/slides/1000024964.jpg",
      discount: false,
      title: "فروش از 20 تا 50 درصد در هر رایانه لوحی!",
      description:
        "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید",
      subImages: [
        "../../assets/images/slides/details/1.jpg",
        "../../assets/images/slides/details/2.jpg",
        "../../assets/images/slides/details/3.jpg",
        "../../assets/images/slides/details/4.jpg",
      ],
    },
    {
      image: "../../assets/images/slides/1000025120.jpg",
      discount: true,
      title: "فروش از 20 تا 50 درصد در هر رایانه لوحی!",
      description:
        "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید",
      subImages: [
        "../../assets/images/slides/details/1.jpg",
        "../../assets/images/slides/details/2.jpg",
        "../../assets/images/slides/details/3.jpg",
        "../../assets/images/slides/details/4.jpg",
      ],
    },
    {
      image: "../../assets/images/slides/home_shoes.jpg",
      discount: false,
      title: "فروش از 20 تا 50 درصد در هر رایانه لوحی!",
      subImages: [
        "../../assets/images/slides/details/1.jpg",
        "../../assets/images/slides/details/2.jpg",
        "../../assets/images/slides/details/3.jpg",
        "../../assets/images/slides/details/4.jpg",
      ],
    },
  ];

  config: SwiperConfigInterface = {
    slidesPerView: 1,
    navigation: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
    autoplay: false,
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

  initData(): void {
    this.mCHover = false;
  }

  mCMouseEnter(event: MouseEvent, id: number): void {
    let mainCategoires = document.getElementsByClassName(
      (event.target as Element).className
    );
    let subCategories = document.getElementsByClassName("sub-category-panel");

    for (let index = 0; index < mainCategoires.length; index++) {
      if (index === id) {
        mainCategoires[index].classList.add("m-c-activate");
        (subCategories[index] as HTMLElement).style.display = "flex";
        (subCategories[index] as HTMLElement).style.visibility = "visible";
        (subCategories[index] as HTMLElement).style.opacity = "1";
      } else {
        mainCategoires[index].classList.remove("m-c-activate");
        (subCategories[index] as HTMLElement).style.display = "none";
        (subCategories[index] as HTMLElement).style.visibility = "hidden";
        (subCategories[index] as HTMLElement).style.opacity = "0";
      }
    }
  }

  convertMoney(price: number): string {
    return moneySeparator(price.toString()) + " تومان";
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

  onIndexChange(event: any) {}
}
