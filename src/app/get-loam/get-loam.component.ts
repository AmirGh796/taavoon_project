import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { moneySeparator } from "../shared/UtilityFunctions";
import { AuthService } from "../auth/auth.service";
import { GetLoamService } from "./get-loam.service";
import {
  LoanPageParametersModel,
  ApplyingForLoanModel,
  BannerSCModel,
  BenefitImageSectionModel,
  BenefitSectionModel,
  StepperSectionModel,
} from "../shared/models/MainSite.model";
import { Router } from "@angular/router";
import { ModalsConfigurationsService } from "../shared/services/ObjectsConfig.service";
import { GetLoanPageItemsModel } from "../shared/models/ContentObjects.model";
import { HttpServices } from "../shared/services/HttpServices.service";
import { UtilityFunctionsService } from "../shared/services/utility-functions.service";
import { environment } from "src/environments/environment";
import { MdbStepperComponent } from "ng-uikit-pro-standard";

@Component({
  selector: "app-get-loam",
  templateUrl: "./get-loam.component.html",
  styleUrls: ["./get-loam.component.scss"],
})
export class GetLoamComponent implements OnInit {
  @ViewChild("stepper", { static: false }) stepper: MdbStepperComponent;
  stepperElement: any;
  isVertical: boolean;
  userAccount: any;
  loader: boolean;
  radioValue: string;
  resultMoney: number;
  months: number;
  jarallaxSec4: string;
  loanPageItems: GetLoanPageItemsModel;

  //siteErrors: SiteErrorEditingModel[];

  tableHeader: any[] = [
    {
      label: "#",
      classes: "",
    },
    {
      label: "تعداد ماه",
      classes: "mr-2 blue-text",
    },
    {
      label: "پرداخت ماهانه",
      classes: "teal-text",
    },
    {
      label: "مبلغ باز پرداخت",
      classes: "indigo-text",
    },
    {
      label: "کارمزد تعاونی",
      classes: "green-text",
    },
  ];

  tableContent: any[] = [
    {
      months: 24,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 23,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 22,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 21,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 20,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 19,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 18,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 17,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 16,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 15,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 14,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 13,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 12,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 11,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 10,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 9,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 8,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 7,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 6,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 5,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 4,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 3,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
    {
      months: 2,
      monthlyPay: "",
      repaymentAmount: "",
      wagePay: "",
    },
  ];

  constructor(
    private configObjects: ModalsConfigurationsService,
    private authService: AuthService,
    private getLoanService: GetLoamService,
    private router: Router,
    private httpService: HttpServices,
    public utilityFunctions: UtilityFunctionsService
  ) {
    this.radioValue = null;
    this.loanPageItems = new GetLoanPageItemsModel();
    this.loanPageItems.banner = new BannerSCModel();
    this.loanPageItems.benefitImage = new BenefitImageSectionModel();
    this.loanPageItems.steps = new Array<StepperSectionModel>();
    this.loanPageItems.benefits = new Array<BenefitSectionModel>();
    this.loanPageItems.loanParameters = new LoanPageParametersModel();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.jarallaxSec4 = environment.jarallaxSec4;
    this.isVertical = false;
    this.userAccount = this.authService.getUserAccount();
    this.months = 24;
    this.resultMoney = 1000000;
    this.loader = true;
    this.httpService.getAllLoanPageItems().subscribe((resultLoanPage) => {
      this.loanPageItems = resultLoanPage;
      this.loader = false;
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.stepperElement = document.getElementById("stepper");
        this.onWindowResize();
        document
          .querySelectorAll(".step-title")
          .forEach((element: HTMLElement) => {
            element.style.paddingRight = "60px";
          });
      }, 500);
    });
  }

  clacMonthlyProfit(): number {
    return Math.ceil(
      (this.loanPageItems.loanParameters.profitRate / 100) * this.resultMoney
    );
  }

  //سود کل وام
  clacTotalProfit(): number {
    // (مبلغ انتخابی * (سود تسهیلات / 100) * تعداد ماه) + ((ارزش افزوده / 100) * مبلغ انتخابی )
    return Math.ceil(
      this.resultMoney *
        (this.loanPageItems.loanParameters.profitRate / 100) *
        this.months +
        (this.loanPageItems.loanParameters.valueAdded / 100) * this.resultMoney
    );
  }

  //باز پرداخت کل
  totalPayment(month: number): number {
    // سود کل وام + مبلغ انتخابی

    // return (
    //   (this.loanParameters.profitRate / 100) * this.resultMoney * month +
    //   this.resultMoney
    // );

    return (
      this.resultMoney *
        (this.loanPageItems.loanParameters.profitRate / 100) *
        month +
      (this.loanPageItems.loanParameters.valueAdded / 100) * this.resultMoney +
      this.resultMoney
    );
  }

  //قسط ماهیانه
  calcMonthlyInstallments(month: number): number {
    // سود کل وام + مبلغ انتخابی) / تعداد ماه)

    // return Math.ceil(
    //   (this.resultMoney +
    //     (this.loanParameters.profitRate / 100) * this.resultMoney * month) /
    //     month +
    //     ((this.loanParameters.valueAdded / 100) * this.resultMoney) / month
    // );

    return Math.ceil((this.clacTotalProfit() + this.resultMoney) / month);
  }

  chooseInstallments(): void {
    if (this.radioValue === null) {
      this.configObjects.alertBoxShow(
        "اخطار",
        "لطفا یکی از اقساط را از جدول انتخاب کنید !!!"
      );
      return;
    }

    this.httpService
      .saveUsersClickedOrView({
        forUserId: this.userAccount?.UserId,
        forSection: 3,
      })
      .subscribe((_) => {});

    if (this.authService.getToken() && this.authService.getToken().length) {
      this.loader = true;
      let createAFL = new ApplyingForLoanModel();
      createAFL = {
        userId: this.userAccount.UserId,
        requestedAmount: this.resultMoney,
        months: this.months,
        totalProfit: 0, //this.clacTotalProfit(),
        monthlyProfit: 0, //this.clacMonthlyProfit(),
        monthlyPay: 0, //this.calcMonthlyInstallments(this.months),
        totalAmount: 0, //this.totalPayment(this.months),
        maxPayTime: 0, //this.loanPageItems.loanParameters.maximumPaymentTime,
      };

      this.getLoanService.validateLoanParams(createAFL).subscribe((res) => {
        this.loader = false;
        switch (res) {
          case 1:
            // this.router
            //   .navigate(["home", "get-loan", "confirm-loan"], {
            //     queryParams: {
            //       requestedAmount: this.resultMoney,
            //       months: this.months,
            //     },
            //   });
            this.router.navigateByUrl("/home/get-loan/confirm-loan");
            break;
          case 0:
            this.configObjects.alertBoxShow(
              "اخطار",
              "اطلاعات ارسالی خالی میباشند !!!"
            );
            break;
          case -1:
            this.configObjects.alertBoxShow(
              "اخطار",
              "مشکلی در محاسبه اطلاعات در سیستم پیش آمده"
            );
            break;
          case -2:
            this.configObjects.alertBoxShow(
              "اخطار",
              "شما هنوز در حالت پرداخت اقساط از وام قبلی هستید و نمیتوانید اقدام به خرید وام جدید کنید"
            );
            break;
          case -3:
            this.configObjects.alertBoxShow(
              "اخطار",
              "شما هنوز فیلد های ضروری در پنل کاربریتان را تکمیل نکردید !",
              2
            );
            break;
          case -4:
            this.configObjects.alertBoxShow(
              "اخطار",
              "مجموع امتیاز شما برای دریافت وام غیر قابل قبول هست"
            );
            break;
          case -5:
            this.configObjects.alertBoxShow(
              "اخطار",
              "به دلیل نداشتن هیچ گونه امتیازی یا دریافت امتیاز منفی متعدد نمیتوانید اقدام به دریافت وام کنید"
            );
            break;
          case -6:
            this.configObjects.alertBoxShow(
              "اخطار",
              "متاسفانه شما در لیست سیاه سایت قرار گرفتید. این اتفاق میتواند دلایل مختلفی داشته باشد. لطفا بخش راهنمای سایت مربوط به این موضوع را کامل مطالعه کنید یا با پشتیبانی تماس بگیرید"
            );
            break;
          case -7:
            this.configObjects.alertBoxShow(
              "اخطار",
              "متاسفانه حساب شما غیر فعال شده است. این اتفاق میتواند دلایل مختلفی داشته باشد. لطفا بخش راهنمای سایت مربوط به این موضوع را کامل مطالعه کنید یا با پشتیبانی تماس بگیرید"
            );
            break;
          case -8:
            this.configObjects.alertBoxShow(
              "اخطار",
              "متاسفانه حساب شما قفل شده است. این اتفاق میتواند دلایل مختلفی داشته باشد. لطفا بخش راهنمای سایت مربوط به این موضوع را کامل مطالعه کنید یا با پشتیبانی تماس بگیرید"
            );
            break;
          case -9:
            this.configObjects.alertBoxShow(
              "اخطار",
              "متاسفانه مدارک شما مورد تایید نمیباشد یا اصلا مدارکی هنوز ارسال نکردید"
            );
            break;
          case -10:
            this.configObjects.alertBoxShow(
              "اخطار",
              "متسفانه هویت حساب شما هنوز تایید نشده. برای تایید هویت حسابتان به بخش راهنمای سایت رجوع کنید"
            );
            break;
          case -11:
            this.configObjects.alertBoxShow(
              "اخطار",
              "متاسفانه مقدار درخواستی شما بیشتر از حد مجاز تایین شده در حسابتان است و نمیتوانید این مبلغ را سفارش دهید"
            );
            break;
          case -12:
            this.configObjects.alertBoxShow(
              "اخطار",
              "شما هنوز به سیستم بدهکار هستید. "
            );
            break;
          case -13:
            this.configObjects.alertBoxShow(
              "اخطار",
              "شما هنوز مدارک خودتان را در پنل کاربری آپلود نکردید !",
              2
            );
            break;
          case -14:
            this.configObjects.alertBoxShow(
              "اخطار",
              "درخواست کارت خرید قبلی شما هنوز در انتظار تایید است . لطفا تا تایید شدن درخواست قبلیتان صبر کنید ."
            );
            break;
          case -15:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد نام شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -16:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد نام خانوادگی شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -17:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد شماره ملی شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -18:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد شماره موبایل ضروری شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -19:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد شماره پرسنلی شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -20:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد تلفن محل کار شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -21:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد شماره شبا شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -22:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد نام کامل ضامن شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -23:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد کد ملی ضامن شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -24:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد تلفن ثابت ضامن شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -25:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد شماره موبایل ضامن شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -26:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد آدرس ضامن شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -27:
            this.configObjects.alertBoxShow(
              "اخطار",
              "تصویر گواهی اشتغال به کار ضامن هنوز آپلود نشده !",
              2
            );
            break;
          case -28:
            this.configObjects.alertBoxShow(
              "اخطار",
              "تصویر آخرین فیش حقوقی ضامن هنوز آپلود نشده !",
              2
            );
            break;
          case -29:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد کد پستی شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -30:
            this.configObjects.alertBoxShow(
              "اخطار",
              "فیلد آدرس منزل شما در پنل کاربری هنوز خالی میباشد !",
              2
            );
            break;
          case -31:
            this.configObjects.alertBoxShow(
              "اخطار",
              "شما هنوز شغل فعلیتان را در پنل کاربری مشخص نکرده اید !",
              2
            );
            break;
          case -32:
            this.configObjects.alertBoxShow(
              "اخطار",
              "شما هنوز محل کارتان را در پنل کاربری مشخص نکرده اید !",
              2
            );
            break;
          case -33:
            this.configObjects.alertBoxShow(
              "اخطار",
              "شما هنوز واحد شغلیتان را در پنل کاربری مشخص نکرده اید !",
              2
            );
            break;
          default:
            break;
        }
      });
    } else {
      this.configObjects.alertBoxShow(
        "اخطار",
        "کاربر گرامی، لطفا اول در سایت ثبت نام و فیلد های لازم در پنل کاربریتان را پر کنید و سپس اقدام به دریافت وام نمایید.",
        1
      );
    }
  }

  setResultMoney(event: any): void {
    this.resultMoney = parseInt(event);
  }

  calcWageValue(months: number): number {
    return (
      this.totalPayment(months) *
      (this.loanPageItems.loanParameters.wageValue / 100)
    );
  }

  onChange(months: number): void {
    this.months = months;
  }

  showMoneyOnScreen(money: number = 0): string {
    return moneySeparator(money.toString());
  }

  goToUPanel(link: number, linkType: number, btnLink: string): void {
    switch (linkType) {
      case 0:
        window.location.href = btnLink;
        break;
      case 1:
        window.location.href = `${environment.userPanel}/account-info/${link}`;
        break;
      case 2:
        let element = document.getElementById("get-loam");
        element.scrollIntoView();
        break;
      default:
        break;
    }
  }

  @HostListener("window:resize")
  onWindowResize() {
    if (window.innerWidth <= 768) {
      this.isVertical = true;
      this.stepperElement.style.textAlign = "start";
      let images: any = document.getElementsByClassName("step-img");
      for (let index = 0; index < images.length; index++) {
        images[index].style.width = "100%";
      }
    } else {
      this.isVertical = false;
      this.stepperElement.style.textAlign = "center";
      let images: any = document.getElementsByClassName("step-img");
      for (let index = 0; index < images.length; index++) {
        images[index].style.width = "unset";
      }
    }
  }
}
