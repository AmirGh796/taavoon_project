import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  RedirectToLinkModel,
  ZarinPalPGAuthorityModel,
} from "../../models/MainSite.model";
import { OnlinePaymentService } from "./online-payment.service";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { HttpServices } from "../../services/HttpServices.service";
import { ModalsConfigurationsService } from "../../services/ObjectsConfig.service";

@Component({
  selector: "app-online-payment",
  templateUrl: "./online-payment.component.html",
  styleUrls: ["./online-payment.component.scss"],
})
export class OnlinePaymentComponent implements OnInit {
  loader: boolean;
  itemId: string;
  second: number;
  bfRequestId: number;
  paymentToken: string;
  status: string;
  trackingCode: string;
  createAuth: ZarinPalPGAuthorityModel;
  redirectToLink: RedirectToLinkModel;
  secondCounterIntr: any;

  constructor(
    private configObjects: ModalsConfigurationsService,
    private router: Router,
    private route: ActivatedRoute,
    private onlinePaymentServivce: OnlinePaymentService,
    private authService: AuthService,
    private httpService: HttpServices
  ) {
    this.createAuth = new ZarinPalPGAuthorityModel();
    this.redirectToLink = new RedirectToLinkModel();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = true;
    this.second = 20;
    this.itemId = this.route.snapshot.params.itemId;
    this.route.queryParamMap.subscribe((params) => {
      this.paymentToken = params.get("Authority");
      this.status = params.get("Status");
      this.status = this.status.toLowerCase();
    });
    this.authenticatePayment();
  }

  authenticatePayment(): void {
    if (
      this.paymentToken &&
      this.paymentToken.length &&
      this.status.length &&
      this.status === "ok" &&
      this.authService.getToken() &&
      this.authService.getToken().length
    ) {
      if (this.validateLS()) {
        this.createAuth = new ZarinPalPGAuthorityModel();
        this.createAuth = {
          itemId: this.itemId,
          authority: this.paymentToken,
          requestTC: localStorage.getItem("BFPayment_RTC"),
          itemUId: parseInt(localStorage.getItem("BFPayment_Id")),
          amount: 0,
        };
        this.onlinePaymentServivce
          .bfRequestPaymentCheck(
            this.authService.getUserAccount().UserId,
            this.createAuth
          )
          .subscribe((resultTC) => {
            this.loader = false;
            if (resultTC && resultTC.resultATC && resultTC.resultATC > 0) {
              this.trackingCode = resultTC.resultATC.toString();
              this.redirectToLink = resultTC;
              this.secondCounter();
            }
            setTimeout(() => {
              localStorage.removeItem("BFPayment_RTC");
              localStorage.removeItem("BFPayment_Id");
            }, 1000);
          });
      } else {
        window.location.href = environment.mainSite;
      }
    } else {
      this.loader = false;
    }
  }

  validateLS(): boolean {
    return localStorage.getItem("BFPayment_RTC") &&
      localStorage.getItem("BFPayment_RTC")?.length &&
      localStorage.getItem("BFPayment_Id") &&
      parseInt(localStorage.getItem("BFPayment_Id")) > 0
      ? true
      : false;
  }

  validatePay(): boolean {
    return this.status === "ok" &&
      this.trackingCode &&
      this.trackingCode?.length
      ? true
      : false;
  }

  secondCounter(): void {
    if (this.secondCounterIntr) clearInterval(this.secondCounterIntr);

    this.secondCounterIntr = setInterval(() => {
      if (this.second > 0) {
        this.second--;
      } else {
        if (
          this.redirectToLink.linkType === 3 &&
          this.redirectToLink.forPayment === 1 &&
          this.redirectToLink.apiLink
        ) {
          this.redirectTo();
        } else {
          this.router.navigateByUrl("/home");
        }
        clearInterval(this.secondCounterIntr);
        return;
      }
    }, 1000);
  }

  viewDetails(): void {
    window.location.href = `${environment.userPanel}/orders-info/services/${this.createAuth.requestTC}`;
  }

  redirectTo(): void {
    this.httpService
      .saveAndSendUserParamsToApiLink(this.createAuth.requestTC)
      .subscribe((resultRedirect) => {
        if (resultRedirect) {
          // this.httpService
          //   .redirectToRestApiLinks(resultRedirect.restApiLink, {
          //     buyDate: resultRedirect.buyDate,
          //     code: resultRedirect.discountCode,
          //   })
          //   .subscribe((resultResponse) => {
          //     console.log(resultResponse);
          //   });
          window.location.href = resultRedirect.restApiLink;
        } else {
          this.configObjects.alertBoxShow(
            "اخطار",
            "مشکلی در سیستم برای هدایت شما به لینک موردنظر پیش آمده ."
          );
        }
      });
  }
}
