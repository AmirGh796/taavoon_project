import { Component, OnInit } from "@angular/core";
import { ContactUsService } from "./contact-us.service";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import {
  PersianCharactersPattern,
  EmailPattern,
} from "../shared/RegexPatterns";
import { GetContactUsPageItemsModel } from "../shared/models/ContentObjects.model";
import {
  BannerSCModel,
  ContactUsPageModel,
  UserSendMessageModel,
} from "../shared/models/MainSite.model";
import { HttpServices } from "../shared/services/HttpServices.service";
import { ModalsConfigurationsService } from "../shared/services/ObjectsConfig.service";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
  loader: boolean;
  loader2: boolean;
  showSuccessText: boolean;
  contactUsPageItems: GetContactUsPageItemsModel;

  titleContactUs: ContactUsPageModel;
  accordionItems: ContactUsPageModel[];
  linkItems: ContactUsPageModel[];

  constructor(
    private builder: FormBuilder,
    private contactService: ContactUsService,
    private httpService: HttpServices,
    private configurObjects: ModalsConfigurationsService
  ) {
    this.contactUsPageItems = new GetContactUsPageItemsModel();
    this.contactUsPageItems.banner = new BannerSCModel();
    this.contactUsPageItems.contactUsItems = new Array<ContactUsPageModel>();
    this.titleContactUs = new ContactUsPageModel();
    this.accordionItems = new Array<ContactUsPageModel>();
    this.linkItems = new Array<ContactUsPageModel>();
  }

  fullname_contact = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
    Validators.pattern(PersianCharactersPattern),
  ]);
  email_contact = new FormControl("", [
    Validators.required,
    Validators.pattern(EmailPattern),
  ]);
  message_contact = new FormControl("", [Validators.required]);
  contactForm: FormGroup = this.builder.group({
    fullname_contact: this.fullname_contact,
    email_contact: this.email_contact,
    message_contact: this.message_contact,
  });

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = true;
    this.showSuccessText = false;
    this.loader2 = false;
    this.httpService.getAllContactUsPageItems().subscribe((res) => {
      this.contactUsPageItems = res;
      this.titleContactUs = this.contactUsPageItems.contactUsItems.find(
        (f) => f.tagType === 0
      );
      this.accordionItems = this.contactUsPageItems.contactUsItems.filter(
        (f) => f.tagType === 1
      );
      this.linkItems = this.contactUsPageItems.contactUsItems.filter(
        (f) => f.tagType === 2
      );
      this.loader = false;
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.initStyles();
      }, 500);
    });
  }

  onsendMessages(): void {
    this.loader2 = true;
    let createMessage = new UserSendMessageModel();
    createMessage.fullName = this.contactForm.value.fullname_contact;
    createMessage.email = this.contactForm.value.email_contact;
    createMessage.message = this.contactForm.value.message_contact;
    createMessage.activate = true;

    this.contactService.postAccordionItem(createMessage).subscribe((res) => {
      this.loader2 = false;
      if (res > 0) {
        this.showSuccessText = true;
      } else {
        this.configurObjects.alertBoxShow(
          "اخطار",
          "مشکلی در ارسال پیام شما در سیستم پیش آمده"
        );
      }
    });
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
      elementQuery[index].style.fontWeight = "bold";
    }
  }
}
