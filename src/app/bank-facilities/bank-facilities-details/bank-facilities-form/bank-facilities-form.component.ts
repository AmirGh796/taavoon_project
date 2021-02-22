import { Component, OnInit } from "@angular/core";
import {
  BankFacilitieItemsModel,
  FormGeneratorPagesModel,
  FormGeneratorControlsModel,
  BankFacilitieCategoriesModel,
  UserBankFacilitiesModel,
  UserRequestBFItemsModel,
} from "src/app/shared/models/MainSite.model";
import { ModalsConfigurationsService } from "src/app/shared/services/ObjectsConfig.service";
import { HttpServices } from "src/app/shared/services/HttpServices.service";
import { BankFacilitiesService } from "../../bank-facilities.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "jalali-moment";
import {
  GetFormPageModel,
  SendFormValuesAndFilesModel,
} from "src/app/shared/models/ContentObjects.model";
import { AuthService } from "src/app/auth/auth.service";
import { generateRandomId } from "src/app/shared/UtilityFunctions";
import { environment } from "src/environments/environment";
import { OnlinePaymentService } from "src/app/shared/components/online-payment/online-payment.service";

@Component({
  selector: "app-bank-facilities-form",
  templateUrl: "./bank-facilities-form.component.html",
  styleUrls: ["./bank-facilities-form.component.scss"],
})
export class BankFacilitiesFormComponent implements OnInit {
  itemId: string;
  loader: boolean;
  formPage: GetFormPageModel;
  bankFacilitieItem: BankFacilitieItemsModel;
  isAuthenticate: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bankFacilitiesService: BankFacilitiesService,
    private httpService: HttpServices,
    private configObjects: ModalsConfigurationsService,
    private authService: AuthService,
    private onlinePayService: OnlinePaymentService
  ) {
    this.formPage = new GetFormPageModel();
    this.formPage.facilitieItem = new BankFacilitieItemsModel();
    this.formPage.facilitieCategory = new BankFacilitieCategoriesModel();
    this.formPage.page = new FormGeneratorPagesModel();
    this.formPage.controls = new Array<FormGeneratorControlsModel>();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = true;
    this.itemId = this.route.snapshot.params.itemId;
    this.httpService
      .getFormPageForFacilitieItem(this.itemId)
      .subscribe((res) => {
        this.formPage = res;
        this.loader = false;
        if (this.authService.getToken() && this.authService.getToken().length) {
          this.isAuthenticate = true;
        } else {
          this.isAuthenticate = false;
        }
        window.scrollTo(0, 0);
      });
  }

  dateConvertToPersian(getTime: any): any {
    let persianDate = moment(getTime).locale("fa").format("MMMM DD YYYY");
    return persianDate;
  }

  receivedFormAllData(event: SendFormValuesAndFilesModel): void {
    if (event) {
      if (this.authService.getToken() && this.authService.getToken().length) {
        let bfRequest = new UserRequestBFItemsModel();
        bfRequest = {
          bfItemId: this.itemId,
          userId: this.authService.getUserAccount().UserId,
          formId: this.formPage.page.formId,
          values: event.formValues,
          files: event.files,
        };

        this.bankFacilitiesService
          .sendRequestBFItemsFromUser(bfRequest)
          .subscribe((bfRequestResult) => {
            if (typeof bfRequestResult === "number") {
              switch (bfRequestResult) {
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
                    "شماره همراه شما هنوز مورد تایید سیستم نمیباشد . برای تایید شماره همراه، وارد پنل کاربریتان شوید و از از آنجا اقدام به تایید کنید"
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
              localStorage.setItem("BFPayment_RTC", bfRequestResult.requestTC);
              localStorage.setItem(
                "BFPayment_Id",
                bfRequestResult.bfRequestId.toString()
              );
              window.location.replace(
                environment.zarinpalPayment + bfRequestResult.resultCode
              );
            }
          });
      } else {
        this.configObjects.alertBoxShow(
          "اخطار",
          "کاربر گرامی ! شما هنوز در سایت ثبت نام یا وارد نشدید .",
          1
        );
        return;
      }
    }
  }
}
