import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import {
  MobilePattern,
  EmailPattern,
  IsNumericInString,
} from "../shared/RegexPatterns";
import { AuthService } from "./auth.service";
import {
  SignUpModel,
  SignInModel,
  ForgotPasswordModel,
} from "../shared/models/Register.Model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ModalsConfigurationsService } from "../shared/services/ObjectsConfig.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { ChangeDetectorRef } from "@angular/core";
import { UtilityFunctionsService } from "../shared/services/utility-functions.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit, AfterViewInit {
  loader: boolean;
  registerUser: SignUpModel;
  sendForgotPassLink: number;
  forgotPassSuccessText: string;
  forgotPassErrorText: string;
  loader2: boolean;
  textDanger: boolean;
  textDangerMessage: string;
  radioModel: "Left" | "Right";

  phonenumber_forgotPass = new FormControl("", [
    Validators.required,
    Validators.pattern(MobilePattern),
  ]);
  email_forgotPass = new FormControl("", [Validators.pattern(EmailPattern)]);
  forgotPassForm: FormGroup = this.builder.group({
    phonenumber_forgotPass: this.phonenumber_forgotPass,
    email_forgotPass: this.email_forgotPass,
  });

  firstName_signUp = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);
  lastName_signUp = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
  ]);
  nationalCode_signUp = new FormControl("", [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  phoneNumber_signUp = new FormControl("", [
    Validators.required,
    Validators.pattern(MobilePattern),
  ]);
  password_signUp = new FormControl("", [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(8),
  ]);
  cPassword_signUp = new FormControl("", [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(8),
  ]);
  signUpForm: FormGroup = this.builder.group({
    firstName_signUp: this.firstName_signUp,
    lastName_signUp: this.lastName_signUp,
    nationalCode_signUp: this.nationalCode_signUp,
    phoneNumber_signUp: this.phoneNumber_signUp,
    password_signUp: this.password_signUp,
    cPassword_signUp: this.cPassword_signUp,
  });

  phoneNumber_signIn = new FormControl("", [
    Validators.required,
    Validators.pattern(MobilePattern),
  ]);
  password_signIn = new FormControl("", [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(8),
  ]);
  signInForm: FormGroup = this.builder.group({
    phoneNumber_signIn: this.phoneNumber_signIn,
    password_signIn: this.password_signIn,
  });

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private configurObjects: ModalsConfigurationsService,
    private deviceService: DeviceDetectorService,
    private cdf: ChangeDetectorRef,
    public utilityFunctions: UtilityFunctionsService
  ) {
    this.registerUser = new SignUpModel();
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.radioModel = "Left";
    this.textDanger = false;
    this.loader2 = false;
    this.sendForgotPassLink = 0;
  }

  onForgotPassword(): void {
    this.loader2 = true;
    let createLink = new ForgotPasswordModel();
    createLink.phoneNumber =
      this.radioModel === "Left"
        ? this.utilityFunctions.fixPhoneNumber(
            this.forgotPassForm.value.phonenumber_forgotPass
          )
        : null;
    createLink.email = this.forgotPassForm.value.email_forgotPass;
    this.authService.forgotPassword(createLink).subscribe((res) => {
      this.loader2 = false;
      switch (res) {
        case 2:
          this.sendForgotPassLink = 1;
          this.forgotPassSuccessText = "کلمه عبور جدید برایتان پیامک شد .";
          break;
        case 1:
          this.sendForgotPassLink = 1;
          this.forgotPassSuccessText = "کلمه عبور جدید برایتان ایمیل شد .";
          break;
        case 0:
          this.sendForgotPassLink = -1;
          this.forgotPassErrorText =
            "متاسفانه مشکلی در ارسال کلمه عبور جدید پیش آمده .";
          break;
        case -1:
          this.sendForgotPassLink = -1;
          this.forgotPassErrorText =
            "متاسفانه مشکلی در ارسال کلمه عبور جدید به صورت پیامک برایتان ، پیش آمده .";
          break;
        case -2:
          this.sendForgotPassLink = -1;
          this.forgotPassErrorText = "کاربری با ایمیل وارد شده یافت نشد .";
          break;
        case -3:
          this.sendForgotPassLink = -1;
          this.forgotPassErrorText = "شماره همراه وارد شده اشتباه میباشد .";
          break;
        case -4:
          this.sendForgotPassLink = -1;
          this.forgotPassErrorText =
            "متاسفانه ایمیلی از شما در سیستم یافت نشد ، اگر ایمیلی در حساب کاربریتان قبلا ثبت نکردید یا اصلا دسترسی به ایمیل ندارید فقط شماره همراهتان را وارد کنید";
          break;
        case -5:
          this.sendForgotPassLink = -1;
          this.forgotPassErrorText =
            "کاربری با شماره همراه وارد شده یافت نشد .";
          break;
        default:
          break;
      }
    });
  }

  returnToHome(): void {
    this.router.navigateByUrl("/home").then((res: boolean) => {
      if (res) {
        window.location.reload();
      }
    });
  }

  goToUserPanel(): void {
    window.location.href = environment.userPanel + "/home";
  }

  openCoockies(): void {
    window.open("https://mdbootstrap.com/docs/angular/", "_blank");
  }

  onSignUpForm(): void {
    if (
      this.signUpForm.value.password_signUp !==
      this.signUpForm.value.cPassword_signUp
    ) {
      this.textDanger = true;
      this.textDangerMessage = "کلمه عبور وارد شده برابر نمیباشد";
      return;
    } else {
      this.textDanger = false;
    }

    this.loader2 = true;

    let signUp = new SignUpModel();
    signUp = {
      id: 0,
      firstName: this.signUpForm.value.firstName_signUp,
      lastName: this.signUpForm.value.lastName_signUp,
      nationalCode: this.signUpForm.value.nationalCode_signUp,
      phoneNumber: this.utilityFunctions.fixPhoneNumber(
        this.signUpForm.value.phoneNumber_signUp
      ),
      password: this.signUpForm.value.password_signUp,
      confirmPassword: this.signUpForm.value.cPassword_signUp,
      userOSInfo: `Browser:${
        this.deviceService.getDeviceInfo().browser
      },BrowserVer:${
        this.deviceService.getDeviceInfo().browser_version
      },Device:${this.deviceService.getDeviceInfo().device},OS:${
        this.deviceService.getDeviceInfo().os
      },OSVer:${this.deviceService.getDeviceInfo().os_version},UserAgent:${
        this.deviceService.getDeviceInfo().userAgent
      }`,
    };

    if (
      this.signUpForm.value.phoneNumber_signUp &&
      this.signUpForm.value.phoneNumber_signUp.length
    ) {
      this.authService.signUp(signUp).subscribe((signUpResult) => {
        this.loader2 = false;
        if (IsNumericInString.test(signUpResult)) {
          let numericResult: number = parseInt(signUpResult);
          switch (numericResult) {
            case -4:
              this.loader2 = false;
              this.textDanger = true;
              this.textDangerMessage = "کلمه عبور وارد شده برابر نمیباشد .";
              return;
            case -3:
              this.loader2 = false;
              this.textDanger = true;
              this.textDangerMessage =
                "شما یکبار با این کد ملی در سیستم ثبت نام کرده اید .";
              return;
            case -2:
              this.loader2 = false;
              this.textDanger = true;
              this.textDangerMessage =
                "شما یکبار با این شماره موبایل در سیستم ثبت نام کرده اید .";
              return;
            case -1:
              this.loader2 = false;
              this.textDanger = true;
              this.textDangerMessage =
                "مشکلی در سیستم برای ثبت نام شما پیش آمده .";
              return;
            case 0:
              this.loader2 = false;
              this.textDanger = true;
              this.textDangerMessage =
                "یکی از فیلد های مورد نیاز برای ثبت نام خالی میباشد . لطفا مراحل ثبت نام را یکبار از اول طی کنید .";
              return;
            default:
              break;
          }
        } else {
          this.authService.setUserToken(signUpResult);
          this.authService.setIsCreateToken = true;
          if (this.authService.getToken()) {
            //this.frameBox.show();
            setTimeout(() => {
              this.utilityFunctions.checkHasFromRoute()
                ? this.utilityFunctions.goFromRoute()
                : (window.location.href = environment.mainSite);
            }, 500);
          }
          this.registerUser = signUp;
          this.textDanger = false;
        }
      });
    } else {
      this.textDanger = true;
      this.textDangerMessage = "شماره همراه نمیتواند خالی باشد";
    }
  }

  onSignInForm(): void {
    this.loader2 = true;
    let signIn = new SignInModel();
    signIn.userName = this.utilityFunctions.fixPhoneNumber(
      this.signInForm.value.phoneNumber_signIn
    );
    signIn.password = this.signInForm.value.password_signIn;

    this.authService.signIn(signIn).subscribe((res) => {
      this.loader2 = false;
      if (res && res.length && res.length > 2) {
        this.authService.setUserToken(res);
        this.authService.setIsCreateToken = true;
        if (this.authService.getUserAccount()) {
          //this.frameBox.show();
          setTimeout(() => {
            this.utilityFunctions.checkHasFromRoute()
              ? this.utilityFunctions.goFromRoute()
              : (window.location.href = environment.mainSite);
          }, 500);
        }
        this.textDanger = false;
      } else if (res && res.length) {
        this.textDanger = true;
        switch (parseInt(res)) {
          case 0:
            this.textDangerMessage =
              "متاسفانه حساب شما به دلایلی در سیستم غیر فعال شده است .";
            break;
          case -1:
            this.textDangerMessage =
              "متاسفانه حساب شما در لیست سیاه قرار گرفته است . ";
            break;
          case -2:
            this.textDangerMessage =
              "متاسفانه حساب شما به دلایلی در سیستم غیر فعال شده است .";
            break;
          case -3:
            this.textDangerMessage =
              "متاسفانه حساب شما قفل شده و نمیتوانید ورود کنید . ";
            break;
          case -4:
            this.textDangerMessage =
              "کاربر گرامی ، حساب شما از سیستم حذف شده و نمیتوانید با آن ورود کنید . لطفا حساب دیگری ایجاد کنید . ";
            break;
          case -5:
            this.textDangerMessage = "کلمه عبور وارد شده اشتباه است . ";
            break;
          case -6:
            this.textDangerMessage =
              "حسابی با این مشخصات وارد شده برای ورود ، در سیستم وجود ندارد . ";
            break;
          case -7:
            this.textDangerMessage =
              "مشکلی در سیستم برای ورود به حسابتان شما پیش آمده . لطفا بعدا مجدد امتحان کنید یا در غیر این صورت با پشتیبانی تماس بگیرید . ";
            break;
          default:
            break;
        }
      } else {
        this.textDanger = true;
        this.textDangerMessage =
          "مشکلی در سیستم برای ورود به حسابتان شما پیش آمده . لطفا بعدا مجدد امتحان کنید یا در غیر این صورت با پشتیبانی تماس بگیرید . ";
      }
    });
  }

  changeSendMode(): void {
    this.textDanger = false;
    this.forgotPassSuccessText = null;
    this.forgotPassErrorText = null;
    if (this.radioModel === "Left") {
      this.phonenumber_forgotPass.setValidators([
        Validators.required,
        Validators.pattern(MobilePattern),
      ]);
      this.email_forgotPass.clearValidators();
      this.email_forgotPass.reset();
    } else {
      this.email_forgotPass.setValidators([
        Validators.required,
        Validators.pattern(EmailPattern),
      ]);
      this.phonenumber_forgotPass.clearValidators();
      this.phonenumber_forgotPass.reset();
    }
    this.cdf.detectChanges();
  }
}
