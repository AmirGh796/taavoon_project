import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { SelectComponent } from "ng-uikit-pro-standard";
import { StoreRegistrationModel } from "../shared/models/StoreRegistration.model";
import { StoreRegistrationService } from "./store-registration.service";
import {
  PersianCharactersPattern,
  EmailPattern,
  UrlPattern,
  MobilePattern,
} from "../shared/RegexPatterns";

const colors: string[] = [
  "#2BBBAD",
  "#4285F4",
  "#AA66CC",
  "#FF8800",
  "#007E33",
  "#0099CC",
  "#CC0000",
];

@Component({
  selector: "app-store-registration",
  templateUrl: "./store-registration.component.html",
  styleUrls: ["./store-registration.component.scss"],
})
export class StoreRegistrationComponent implements OnInit, AfterViewInit {
  heightOfItems: number;
  optionsSelect: Array<any>;
  ItemWrapper: any[] = [
    {
      title: "test",
    },
    {
      title: "test2",
    },
    {
      title: "test3",
    },
    {
      title: "test4",
    },
  ];
  optionSelectedItem: string;

  fullname_reg = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
    Validators.pattern(PersianCharactersPattern),
  ]);
  email_reg = new FormControl("", [
    Validators.required,
    Validators.pattern(EmailPattern),
  ]);
  url_reg = new FormControl("", [
    Validators.required,
    Validators.pattern(UrlPattern),
  ]);
  phonenumber_reg = new FormControl("", [
    Validators.required,
    Validators.pattern(MobilePattern),
  ]);
  storename_reg = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);
  category_reg = new FormControl("", [Validators.required]);

  registerStore: FormGroup = this.builder.group({
    fullname_reg: this.fullname_reg,
    email_reg: this.email_reg,
    url_reg: this.url_reg,
    phonenumber_reg: this.phonenumber_reg,
    storename_reg: this.storename_reg,
    category_reg: this.category_reg,
  });

  constructor(
    private builder: FormBuilder,
    private httpService: StoreRegistrationService
  ) {
    this.heightOfItems = 0;
    this.optionsSelect = [
      { value: "1", label: "دیجیتال" },
      { value: "2", label: "مد و استایل" },
      { value: "3", label: "بلیط و هتل" },
    ];
  }

  ngAfterViewInit(): void {
    this.initStyles();
    this.drawDashedLines();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  initStyles(): void {
    let floatItems: any = document.getElementsByClassName("item-draw");
    let floatItemsContent: any = document.getElementsByClassName(
      "item-content-draw"
    );
    let icIcon: any = document.getElementsByClassName("i-c-icon");
    let icDesc: any = document.getElementsByClassName("i-c-desc");

    for (let index = 0; index < floatItems.length; index++) {
      floatItemsContent[index].style.backgroundColor = colors[index];
      if (index % 2 === 0) {
        floatItems[index].style.float = "right";
        floatItems[index].style.borderTopLeftRadius = "100%";
        floatItems[index].style.borderBottomLeftRadius = "100%";
        floatItems[index].style.marginInlineStart = "-12px";
        floatItemsContent[index].style.borderTopLeftRadius = "100%";
        floatItemsContent[index].style.borderBottomLeftRadius = "100%";
        icIcon[index].style.paddingInlineStart = "136px";
        icDesc[index].style.paddingInlineStart = "50px";
        icDesc[index].style.paddingInlineEnd = "80px";
      } else {
        floatItems[index].style.float = "left";
        floatItems[index].style.borderTopRightRadius = "100%";
        floatItems[index].style.borderBottomRightRadius = "100%";
        floatItems[index].style.marginInlineEnd = "-12px";
        floatItemsContent[index].style.borderTopRightRadius = "100%";
        floatItemsContent[index].style.borderBottomRightRadius = "100%";
        icIcon[index].style.paddingInlineStart = "60px";
        icDesc[index].style.paddingInlineStart = "72px";
        icDesc[index].style.paddingInlineEnd = "10px";
      }
    }

    this.heightOfItems = 500 * this.ItemWrapper.length;
    let cooperationSection = document.getElementById("cooperation-section");
    cooperationSection.style.height = this.heightOfItems + "px";

    //Tabs and pills benefit's element
    let benefitsCards: any = document.getElementsByClassName("card");
    //let benefitsTabs: any = document.getElementsByClassName("tab-content");
    for (let index = 0; index < benefitsCards.length; index++) {
      benefitsCards[index].style.boxShadow = "none";
      //benefitsTabs[index].style.boxShadow = "none";
    }

    //Ng-Marquee set styles
    let ngMarquee: any = document.getElementsByClassName("ng-marquee");
    for (let index = 0; index < ngMarquee.length; index++) {
      ngMarquee[index].style.paddingBlockStart = "10px";
      ngMarquee[index].style.paddingBlockEnd = "10px";
    }
  }

  drawDashedLines(): void {
    //Get elements of cooperation's items
    let createLine: any = document.getElementById("dashed-line");
    let items: any = document.getElementsByClassName("item-draw");
    let itemPositions: HTMLElement[] = [];

    for (let index = 0; index < items.length; index++) {
      itemPositions.push(items[index]);
    }

    console.log(itemPositions);

    //Set width and height for canvas
    createLine.width = screen.width;
    createLine.height = this.heightOfItems;

    //Create dashed line between cooperation
    let ctx_dashed = createLine.getContext("2d");
    ctx_dashed.setLineDash([15, 15]);
    ctx_dashed.lineWidth = 6;
    ctx_dashed.strokeStyle = "#888888";

    for (let index = 0; index < itemPositions.length; index++) {
      if (index === 0) {
        ctx_dashed.moveTo(
          itemPositions[0].offsetLeft,
          itemPositions[0].offsetTop + itemPositions[0].offsetHeight / 2
        );
        ctx_dashed.lineTo(
          screen.width / 2 - screen.width / 6,
          itemPositions[0].offsetTop + itemPositions[0].offsetHeight / 2
        );
        ctx_dashed.arcTo(
          screen.width / 2 - screen.width / 6 - 100,
          itemPositions[0].offsetTop + itemPositions[0].offsetHeight / 2,
          screen.width / 2 - screen.width / 6 - 100,
          itemPositions[0].offsetTop + itemPositions[0].offsetHeight,
          100
        );
        ctx_dashed.arcTo(
          screen.width / 2 - screen.width / 6 - 100,
          itemPositions[0].offsetTop + itemPositions[0].offsetHeight,
          screen.width / 2 + screen.width / 5,
          itemPositions[0].offsetTop + itemPositions[0].offsetHeight + 20,
          100
        );
        ctx_dashed.arcTo(
          screen.width / 2 + screen.width / 6,
          itemPositions[0].offsetTop + itemPositions[0].offsetHeight + 30,
          screen.width / 2 + screen.width / 4,
          itemPositions[index + 1].offsetTop +
            itemPositions[index + 1].offsetHeight,
          100
        );
        ctx_dashed.arcTo(
          screen.width / 2 + screen.width / 4,
          itemPositions[index + 1].offsetTop +
            itemPositions[index + 1].offsetHeight / 2,
          screen.width / 6,
          itemPositions[index + 1].offsetTop +
            itemPositions[index + 1].offsetHeight,
          100
        );
        ctx_dashed.lineTo(
          itemPositions[index + 1].offsetWidth,
          itemPositions[index + 1].offsetHeight +
            itemPositions[index + 1].offsetHeight / 2 +
            20
        );
        ctx_dashed.stroke();
      } else {
        if (itemPositions[index + 1]) {
          ctx_dashed.moveTo(
            itemPositions[index].offsetLeft +
              itemPositions[index].offsetWidth / 2,
            itemPositions[index].offsetTop + itemPositions[index].offsetHeight
          );
          ctx_dashed.lineTo(
            itemPositions[index].offsetLeft +
              itemPositions[index].offsetWidth / 2,
            itemPositions[index + 1].offsetTop +
              itemPositions[index + 1].offsetHeight / 4
          );
          ctx_dashed.arcTo(
            itemPositions[index].offsetLeft +
              itemPositions[index].offsetWidth / 2,
            itemPositions[index + 1].offsetTop +
              itemPositions[index + 1].offsetHeight / 2,
            index % 2 === 0
              ? itemPositions[index].offsetLeft
              : itemPositions[index].offsetLeft +
                  itemPositions[index].offsetWidth,
            itemPositions[index + 1].offsetTop +
              itemPositions[index + 1].offsetHeight / 2,
            100
          );
          ctx_dashed.lineTo(
            index % 2 === 0
              ? itemPositions[index + 1].offsetLeft +
                  itemPositions[index + 1].offsetWidth
              : itemPositions[index + 1].offsetLeft,
            itemPositions[index + 1].offsetTop +
              itemPositions[index + 1].offsetHeight / 2
          );
          ctx_dashed.stroke();
        }
      }
    }
  }

  onRegisterStore(): void {
    let store = new StoreRegistrationModel();
    store.fullName = this.registerStore.value.fullname_reg;
    store.email = this.registerStore.value.email_reg;
    store.url = this.registerStore.value.url_reg;
    store.phoneNumber = this.registerStore.value.phonenumber_reg;
    store.storeName = this.registerStore.value.storename_reg;
    store.category = this.registerStore.value.category_reg;

    this.httpService.postRegistrationStore(store).subscribe((res) => {
      console.log(res);
    });
  }

  optionSelected(event: SelectComponent): void {
    this.optionSelectedItem = event.label;
  }
}
