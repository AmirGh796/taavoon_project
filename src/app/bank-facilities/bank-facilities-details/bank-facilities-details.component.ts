import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BankFacilitiesService } from "../bank-facilities.service";
import { HttpServices } from "src/app/shared/services/HttpServices.service";
import { ModalsConfigurationsService } from "src/app/shared/services/ObjectsConfig.service";
import {
  BankFacilitieItemsModel,
  UserRequestBFItemsModel,
} from "src/app/shared/models/MainSite.model";
import * as moment from "jalali-moment";
import { AuthService } from "src/app/auth/auth.service";
import { UtilityFunctionsService } from "src/app/shared/services/utility-functions.service";
import { environment } from "src/environments/environment";
import { OnlinePaymentService } from "src/app/shared/components/online-payment/online-payment.service";

@Component({
  selector: "app-bank-facilities-details",
  templateUrl: "./bank-facilities-details.component.html",
  styleUrls: ["./bank-facilities-details.component.scss"],
})
export class BankFacilitiesDetailsComponent implements OnInit {
  itemId: string;
  loader: boolean;
  loader2: boolean;
  userAccount: any;
  bankFacilitieItem: BankFacilitieItemsModel;

  bankFacilitie5LastItems_Tmp: BankFacilitieItemsModel[];
  bankFacilitie5LastItems: BankFacilitieItemsModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bankFacilitiesService: BankFacilitiesService,
    private httpService: HttpServices,
    private configObjects: ModalsConfigurationsService,
    private authService: AuthService,
    public utilityFunctions: UtilityFunctionsService,
    private onlinePayService: OnlinePaymentService
  ) {
    this.bankFacilitie5LastItems_Tmp = new Array<BankFacilitieItemsModel>();
    this.bankFacilitie5LastItems = new Array<BankFacilitieItemsModel>();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = true;
    this.loader2 = false;
    this.userAccount = this.authService.getUserAccount();
    this.itemId = this.route.snapshot.params.itemId;
    this.httpService
      .getBankFacilitieByItemId(this.itemId)
      .subscribe((resultBFItem) => {
        this.bankFacilitieItem = resultBFItem;
        this.httpService
          .getBankFacilitieLast5Items(this.bankFacilitieItem.forCategory)
          .subscribe((result5Items) => {
            this.bankFacilitie5LastItems_Tmp = result5Items;
            this.bankFacilitie5LastItems = this.bankFacilitie5LastItems_Tmp.filter(
              (f) => f.id !== this.bankFacilitieItem.id
            );
            this.loader = false;
            window.scrollTo(0, 0);
          });
      });
  }

  showTextByLimitCharacters(limit: number, text: string): string {
    return text && text.length ? text.substr(0, limit) + " ..." : "";
  }

  showOtherItem(itemId: string): void {
    this.router
      .navigateByUrl(`/home/bank-facilities/bank-facilities-details/${itemId}`)
      .then(() => {
        this.bankFacilitieItem = this.bankFacilitie5LastItems.find(
          (f) => f.itemId === itemId
        );
        this.bankFacilitie5LastItems = this.bankFacilitie5LastItems_Tmp.filter(
          (f) => f.id !== this.bankFacilitieItem.id
        );
        this.itemId = this.route.snapshot.params.itemId;
      });
  }

  openLink(linkType: number): void {
    this.httpService
      .saveUsersClickedOrView({
        forUserId: this.userAccount?.UserId,
        forSection: 1,
        forCategory: this.bankFacilitieItem.forCategory,
        forItemId: this.itemId,
      })
      .subscribe((_) => {
        switch (linkType) {
          //Hedayat be form ha
          case 1:
            this.loader2 = true;
            if (
              this.authService.getToken() &&
              this.authService.getToken()?.length
            ) {
              this.authService
                .isUserAuthenticated(this.authService.getUserAccount().UserId)
                .subscribe((resultAuth) => {
                  this.loader2 = false;
                  if (resultAuth.value === 1) {
                    this.router.navigateByUrl(
                      `/home/bank-facilities/bank-facilities-details/${this.itemId}/forms`
                    );
                  } else if (resultAuth.value === -4) {
                    this.configObjects.alertBoxShow(
                      "اخطار",
                      resultAuth.title,
                      3
                    );
                  } else {
                    this.configObjects.alertBoxShow("اخطار", resultAuth.title);
                  }
                });
            } else {
              this.configObjects.alertBoxShow(
                "اخطار",
                "کاربر گرامی، لطفا ابتدا در سایت ثبت نام کنید و سپس اقدام به تکمیل و ارسال فرم نمایید",
                1
              );
            }
            break;
          //Hedayat faghat be linke entekhabi
          case 2:
            window.location.href = this.bankFacilitieItem.backLink;
            break;
          //Hedayat be dargah bank va sepas be linke morede nazar az tarighe api
          case 3:
            if (
              !this.authService.getToken() ||
              !this.authService.getToken().length
            ) {
              this.configObjects.alertBoxShow(
                "اخطار",
                "کاربر گرامی ! شما تا زمانی که به سیستم ورود نکرده اید، نمیتوانید از این خدمات استفاده کنید.",
                1
              );
              return;
            } else {
              this.loader2 = true;

              let bfRequest = new UserRequestBFItemsModel();
              bfRequest = {
                bfItemId: this.itemId,
                userId: this.authService.getUserAccount().UserId,
              };

              this.bankFacilitiesService
                .sendRequestBFItemsFromUser(bfRequest)
                .subscribe((bfRequestResult) => {
                  this.loader2 = false;
                  if (typeof bfRequestResult === "number") {
                    switch (bfRequestResult) {
                      case -7:
                        this.configObjects.alertBoxShow(
                          "اخطار",
                          "متاسفانه برای درگاه پرداخت مشکلی پیش آمده ."
                        );
                        break;
                      case -6:
                        this.configObjects.alertBoxShow(
                          "اخطار",
                          "متاسفانه برای درگاه پرداخت مشکلی پیش آمده ."
                        );
                        break;
                      case -5:
                        this.configObjects.alertBoxShow(
                          "اخطار",
                          "متاسفانه برای درگاه پرداخت مشکلی پیش آمده ."
                        );
                        break;
                      case -4:
                        this.configObjects.alertBoxShow(
                          "اخطار",
                          "شماره همراه شما هنوز مورد تایید سیستم نمیباشد . برای تایید شماره همراه، وارد پنل کاربریتان شوید و از از آنجا اقدام به تایید کنید",
                          3
                        );
                        break;
                      case -3:
                        this.configObjects.alertBoxShow(
                          "اخطار",
                          "متاسفانه حساب شما قفل شده است. این اتفاق میتواند دلایل مختلفی داشته باشد. لطفا بخش راهنمای سایت مربوط به این موضوع را کامل مطالعه کنید یا با پشتیبانی تماس بگیرید"
                        );
                        break;
                      case -2:
                        this.configObjects.alertBoxShow(
                          "اخطار",
                          "متاسفانه شما در لیست سیاه سایت قرار گرفتید. این اتفاق میتواند دلایل مختلفی داشته باشد. لطفا بخش راهنمای سایت مربوط به این موضوع را کامل مطالعه کنید یا با پشتیبانی تماس بگیرید"
                        );
                        break;
                      case -1:
                        this.configObjects.alertBoxShow(
                          "اخطار",
                          "متاسفانه مشکلی برای سیستم پیش آمده و شما قادر به ارسال درخواست برای این سرویس نیستید ."
                        );
                        break;
                      case 0:
                        this.configObjects.alertBoxShow(
                          "اخطار",
                          "متاسفانه ارسال درخواست شما برای این سرویس امکان پذیر نمیباشد ."
                        );
                        break;
                      default:
                        break;
                    }
                  } else {
                    localStorage.setItem(
                      "BFPayment_RTC",
                      bfRequestResult.requestTC
                    );
                    localStorage.setItem(
                      "BFPayment_Id",
                      bfRequestResult.bfRequestId.toString()
                    );
                    setTimeout(() => {
                      window.location.replace(
                        environment.zarinpalPayment + bfRequestResult.resultCode
                      );
                    }, 1000);
                  }
                });
            }
            break;
          default:
            break;
        }
      });
  }
}
