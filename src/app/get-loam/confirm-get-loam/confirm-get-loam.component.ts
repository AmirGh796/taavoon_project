import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { GetLoamService } from "../get-loam.service";
import { Router, NavigationStart, Event } from "@angular/router";
import { UserConfirmFormBuyLoanModel } from "src/app/shared/models/UserInformation.model";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { filter } from "rxjs/operators";
import { ModalsConfigurationsService } from "src/app/shared/services/ObjectsConfig.service";
import { UtilityFunctionsService } from "src/app/shared/services/utility-functions.service";

@Component({
  selector: "app-confirm-get-loam",
  templateUrl: "./confirm-get-loam.component.html",
  styleUrls: ["./confirm-get-loam.component.scss"],
})
export class ConfirmGetLoamComponent implements OnInit {
  userId: string;
  userAccount: any;
  requestedAmount: number;
  months: number;
  loader: boolean;
  loader2: boolean;
  userConfirmForm: UserConfirmFormBuyLoanModel;

  userid_cf = new FormControl("", []);
  fullname_cf = new FormControl("", []);
  nationalcode_cf = new FormControl("", []);
  telephone_cf = new FormControl("", []);
  phonenumber_cf = new FormControl("", []);
  email_cf = new FormControl("", []);
  shabanumber_cf = new FormControl("", []);
  requestedamount_cf = new FormControl("", []);
  months_cf = new FormControl("", []);
  address_cf = new FormControl("", []);
  confrimallrules_cf = new FormControl(false);
  confirmForm: FormGroup = this.builder.group({
    userid_cf: this.userid_cf,
    fullname_cf: this.fullname_cf,
    nationalcode_cf: this.nationalcode_cf,
    telephone_cf: this.telephone_cf,
    phonenumber_cf: this.phonenumber_cf,
    email_cf: this.email_cf,
    shabanumber_cf: this.shabanumber_cf,
    requestedamount_cf: this.requestedamount_cf,
    months_cf: this.months_cf,
    address_cf: this.address_cf,
    confrimallrules_cf: this.confrimallrules_cf,
  });

  constructor(
    private configObjects: ModalsConfigurationsService,
    private authService: AuthService,
    private getLoamService: GetLoamService,
    private router: Router,
    private builder: FormBuilder,
    public utilityFunctions: UtilityFunctionsService
  ) {
    this.userConfirmForm = new UserConfirmFormBuyLoanModel();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = true;
    this.loader2 = false;
    this.userAccount = this.authService.getUserAccount();
    this.userId = this.userAccount.UserId;
    this.getLoamService
      .getUserConfirmFormBuyLoan(this.userId)
      .subscribe((res) => {
        this.userConfirmForm = res;
        this.confirmForm.patchValue({
          userid_cf: this.userConfirmForm.userId,
          fullname_cf: this.userConfirmForm.fullName,
          nationalcode_cf: this.userConfirmForm.nationalCode,
          telephone_cf: this.userConfirmForm.telephone,
          phonenumber_cf: this.userConfirmForm.phoneNumber,
          email_cf: this.userConfirmForm.email,
          shabanumber_cf: this.userConfirmForm.shabaNumber,
          requestedamount_cf: this.utilityFunctions.moneySeparator(
            this.userConfirmForm.requestedAmount.toString() + " تومان"
          ),
          months_cf: this.userConfirmForm.months + " ماه",
          address_cf: this.userConfirmForm.address,
        });
        this.loader = false;
        this.router.events
          .pipe(
            filter(
              (e: Event): e is NavigationStart => e instanceof NavigationStart
            )
          )
          .subscribe((e: NavigationStart) => {
            if (e instanceof NavigationStart) {
              this.cancelOperation(false);
              return;
            }
          }).closed;
        window.scrollTo(0, 0);
      });
  }

  onConfirmForm(): void {
    if (this.confirmForm.value.confrimallrules_cf) {
      this.loader2 = true;
      this.getLoamService
        .createUserLoan(this.userId)
        .subscribe((trackingCode) => {
          if (trackingCode || trackingCode.length) {
            this.router.navigateByUrl(
              "/home/get-loan/success-get-loan/" + trackingCode
            );
          } else {
            this.loader2 = false;
            this.configObjects.alertBoxShow(
              "اخطار",
              "متاسفانه درخواست شما برای دریافت کارت خرید پذیرفته نشد"
            );
          }
        });
    } else {
      this.configObjects.alertBoxShow(
        "اخطار",
        "شما هنوز قوانین رو تایید نکردید"
      );
    }
  }

  cancelOperation(fromCancelBtn: boolean): void {
    this.loader = true;
    this.getLoamService.cancelBuyLoanOperation(this.userId).subscribe((res) => {
      this.loader = false;
      if (res) {
        if (fromCancelBtn) {
          this.router.navigateByUrl("/home/get-loan").then(() => {
            location.reload();
          });
        } else {
          location.reload();
        }
      } else {
        this.configObjects.alertBoxShow(
          "اخطار",
          "مشکلی در لغو عملیات یا بازگشت شما به صفحات دیگر پیش آمده"
        );
      }
    });
  }
}
