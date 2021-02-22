import { Component, OnInit } from "@angular/core";
import { HttpServices } from "../../services/HttpServices.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { EmailPattern } from "../../RegexPatterns";
import {
  FooterMenuModel,
  SocialLinksModel,
  NewsletterEmailsModel,
} from "../../models/MainSite.model";
import { GetFooterItemsModel } from "../../models/ContentObjects.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  footerItems: GetFooterItemsModel;
  loader: boolean;
  textDangerMessage: string;
  isPostNewsEmail: number;

  constructor(
    private httpService: HttpServices,
    private builder: FormBuilder,
    private authService: AuthService
  ) {
    this.footerItems = new GetFooterItemsModel();
    this.footerItems.allSocials = new Array<SocialLinksModel>();
    this.footerItems.footerItems = new Array<FooterMenuModel>();
  }

  email_news = new FormControl("", [
    Validators.required,
    Validators.pattern(EmailPattern),
  ]);
  emailNewsForm: FormGroup = this.builder.group({
    email_news: this.email_news,
  });

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = false;
    this.isPostNewsEmail = -2;
    this.httpService.getAllFooterItems().subscribe((res) => {
      this.footerItems = res;
      this.httpService.setLoadFooterData = true;
    });
  }

  onSendEmail(): void {
    if (
      !this.emailNewsForm.value.email_news &&
      !this.emailNewsForm.value.email_news.length
    ) {
      this.isPostNewsEmail = -1;
      this.textDangerMessage = "فیلد ایمیل شما نباید خالی باشد !";
      return;
    }

    this.loader = true;
    let createEmail = new NewsletterEmailsModel();
    createEmail = {
      id: -1,
      userId: this.authService.getUserAccount().UserId,
      email: this.emailNewsForm.value.email_news,
      localIPAddress: null,
      isSystemUser: false,
      activate: true,
      saveDate: null,
    };

    this.httpService.saveEmailsForNews(createEmail).subscribe((res) => {
      this.loader = false;
      this.isPostNewsEmail = res;
      switch (this.isPostNewsEmail) {
        case -1:
          this.textDangerMessage = "مشکلی در سیستم برای ثبت ایمیل شما پیش آمده";
          break;
        case 0:
          this.textDangerMessage =
            "شما یکبار قبلا با این ایمیل عضو خبرنامه شده اید";
          break;
        default:
          this.textDangerMessage = "عضویت شما با موفقیت ثبت شد .";
          break;
      }
    });
  }

  openNamadLink(): void {
    window.open(
      "https://trustseal.enamad.ir/Verify.aspx?id=128108&p=sQDUBJ8cC3S7vS2O",
      "Popup",
      "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
    );
  }

  showZPTrust(): void {
    window.open(
      "https://www.zarinpal.com/trustPage/" + window.location.hostname,
      null,
      "width=450, height=600, scrollbars=no, resizable=no"
    );
  }

  openTab(link: string): void {
    window.open(link, "_blank");
  }
}
