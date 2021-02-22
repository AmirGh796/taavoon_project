import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import {
  CarouselComponent,
  MDBModalRef,
  MDBModalService,
} from "ng-uikit-pro-standard";
import { ImagesBoxComponent } from "src/app/shared/components/modals/images-box/images-box.component";
import { moneySeparator } from "src/app/shared/UtilityFunctions";

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.scss"],
})
export class ViewProductComponent implements OnInit, AfterViewInit {
  @ViewChild("imagesGallery") imagesGallery: any;
  @ViewChild("descriptionTabs") descriptionTabs: any;

  propertiesList: any[] = [
    {
      prop: "سیستم عامل: Android",
    },
    {
      prop: "شبکه های ارتباطی: 4G، 3G، 2G",
    },
    {
      prop: "مقدار RAM: 6 گیگابایت",
    },
    {
      prop: "رزولوشن عکس: 64 مگاپیکسل",
    },
    {
      prop: "نسخه سیستم عامل: Pie 9.0",
    },
    {
      prop: "فناوری: IPS",
    },
    {
      prop: "ویژگی‌های خاص: مجهز به حس‌گر اثرانگشت فبلت مناسب عکاسی مناسب بازی",
    },
    {
      prop: "اندازه: 6.53",
    },
  ];
  elements: any = [
    {
      activate: true,
      merchantName: "مرکز تامین کالای دیجیتال ایران",
      rangeToGetProduct: "تامین کالا از ۱ روز کاری آینده",
      ratingOperation: 4.8,
      waranty: "گارانتی ۱۸ ماهه بازرگانی مهر",
      price: moneySeparator("4900000"),
    },
    {
      activate: false,
      merchantName: "آواژنگ",
      rangeToGetProduct: "تامین کالا از ۱ روز کاری آینده",
      ratingOperation: 4.5,
      waranty: "گارانتی ۱۸ ماهه آواژنگ",
      price: moneySeparator("5000000"),
    },
    {
      activate: false,
      merchantName: "ایرانیان قاعم همراه",
      rangeToGetProduct: "تامین کالا از 2 روز کاری آینده",
      ratingOperation: 5,
      waranty: "گارانتی ۱۸ ماهه کاوش تیم",
      price: moneySeparator("5100000"),
    },
  ];
  headElements = [
    "نام فروشنده",
    "بازه تامیین کالا",
    "نمره عملکرد",
    "گارانتی کالا",
    "قیمت به تومان",
    "جزییات فروشگاه",
    "افزودن به سبد خرید",
  ];

  public chartType: string = "horizontalBar";
  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "وضعیت فعلی" },
  ];
  public chartLabels: Array<any> = [
    "کیفیت ساخت",
    "ارزش خرید به نسبت قیمت",
    "نوآوری",
    "امکانات و قابلیت ها",
    "سهولت استفاده",
    "طراحی و ظاهر",
  ];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        "rgba(255, 159, 64, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(0, 199, 83, 0.8)",
        "rgba(0, 199, 83, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ]
    },
  ];
  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}

  maxProp: number;
  toggleProp: boolean;
  toggledesc: boolean;
  descriptionText: string;
  tempDescription: string;

  openImagesBoxModal: MDBModalRef;
  openImagesBoxModalOption: any;

  carouselSlides: any = [
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359700.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359706.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359708.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359709.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359711.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359700.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359706.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359708.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359709.jpg",
    },
    {
      image:
        "https://dkstatics-public.digikala.com/digikala-products/114359711.jpg",
    },
  ];

  constructor(private modalService: MDBModalService) {}

  ngAfterViewInit(): void {
    this.initStyles();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.toggleProp = true;
    this.toggledesc = true;
    this.descriptionText = `گوشی مدل «Redmi Note 8 Pro» از سری محصولات شرکت مطرح شیائومی است که
    با 4 دوربین
    در پشت گوشی و پنل­ IPS LCD ساخته‌شده و فاصله لبه صفحه‌نمایش در آن بسیار کم است.
    این محصول دارای حسگر اثرانگشت است و نمایشگر آن رزولوشن بالایی در مقایسه با
    گوشی‌های معمول موجود در بازار دارد؛ به‌طوری‌که در اندازه‌ی 6.53 اینچی‌اش، حدود
    395 پیکسل را در هر اینچ جا داده است. در گوشی ردمی‌ نوت 8 پرو شیائومی نمایشگر
    تقریباً تمام قاب جلویی گوشی را پر کرده است. این مشخصه در کنار بدنه‌ای از جنس
    شیشه قرار گرفته است که ظاهر چندرنگی و جلوه­‌ای لوکس به ردمی نوت 8 پرو بخشیده
    است. این بدنه­‌ی زیبا در کنار نمایشگر این محصول، با استفاده از Corning Gorilla
    Glass 5 محافظت می‌شود تا گوشی در برابر خط‌وخش ایمن باشد. ویژگی دیگر Xiaomi Redmi
    Note 8 Pro مجهز شدن به حسگر اثرانگشت است. این فناوری خطوط انگشت شما را با
    استفاده از فناوری جدید شناسایی می­‌کند و تنها با لمس انگشت شما قفل گوشی را باز
    می­‌کند. اما این پایان کار نیست؛ 4 دوربین که در آن‌ها سنسور 64 مگاپیکسلی، 8
    مگاپیکسلی و دو دوربین 2 مگاپیکسلی قرار دارد در قسمت پشتی این گوشی جای گرفته‌اند.
    دوربین‌ سلفی این محصول هم به سنسوری 20 مگاپیکسلی مجهز شده است. قابلیت اتصال به
    شبکه­‌های 4G با سرعت کاملاً مطلوب، بلوتوث نسخه­‌ی 5.0، نسخه­‌ی 9.0 از اندروید و
    باتری 4500 میلی آمپرساعتی از دیگر ویژگی­‌های این گوشی جدید هستند. ازنظر
    سخت­‌افزاری هم این گوشی از تراشه­‌ی Helio G90T مدیاتک بهره می‌­برد که در آن
    پردازنده‌­ای هشت‌هسته‌ا‌ی و قدرتمند قرارگرفته تا بتواند علاوه‌بر کارهای معمول،
    از قابلیت­‌های جدید گوشی‌های امروزی پشتیبانی کند. گوشی Xiaomi Redmi Note 8 Pro
    محصولی بسیار زیبا و با ارزش خرید بالاست که به نظر می‌رسد محبوبیت بالایی را بین
    کاربران به خود اختصاص خواهد داد. `;
    this.toggleProperties();
    this.toggleDescription();
  }

  initStyles(): void {
    let olElement: HTMLElement[] = this.imagesGallery.carouselIndicators;
    olElement[0].parentElement.style.padding = "0px";
    olElement[0].parentElement.style.bottom = "-16px";
    for (let index = 0; index < olElement.length; index++) {
      olElement[index].style.border = "2px solid #c1c1c1";
      olElement[index].style.borderRadius = "4px";
      olElement[index].style.margin = "10px";
    }

    let tabElement: any = this.descriptionTabs;
    let tabNodes = tabElement.itemsList.nativeElement
      .children as HTMLCollection;
    for (let index = 0; index < tabNodes.length; index++) {
      (tabNodes[index] as HTMLElement).style.margin = "0px";
    }

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
      elementQuery[index].style.fontSize = "20px";
      elementQuery[index].style.fontWeight = "500";
    }
  }

  toggleProperties(): void {
    this.toggleProp = !this.toggleProp;
    this.toggleProp
      ? (this.maxProp = this.propertiesList.length)
      : (this.maxProp = 3);
  }

  toggleDescription(): void {
    this.toggledesc = !this.toggledesc;

    if (!this.toggledesc) {
      this.tempDescription = this.descriptionText.slice(0, 400);
      this.tempDescription += " ... ";
    } else {
      this.tempDescription = this.descriptionText;
    }
  }

  convertMoney(price: number): string {
    return moneySeparator(price.toString()) + " تومان";
  }

  openImageBox(): void {
    this.openImagesBoxModalOption = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-xl modal-top-left",
      containerClass: "top",
      animated: true,
      data: {
        title: "گوشی samsung galaxy s20 ultra",
        images: this.carouselSlides,
      },
    };
    this.openImagesBoxModal = this.modalService.show(
      ImagesBoxComponent,
      this.openImagesBoxModalOption
    );
  }
}
