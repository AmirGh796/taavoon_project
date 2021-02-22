import { Component, OnInit, ViewChild } from "@angular/core";
import { BankFacilitiesService } from "./bank-facilities.service";
import { HttpServices } from "../shared/services/HttpServices.service";
import { GetBankFacilitiesPageItemsModel } from "../shared/models/ContentObjects.model";
import {
  BannerSCModel,
  BankFacilitieCategoriesModel,
  BankFacilitieItemsModel,
  BankFacilitiesUtilityModel,
} from "../shared/models/MainSite.model";
import { TabsetComponent } from "ng-uikit-pro-standard";
import { UtilityFunctionsService } from "../shared/services/utility-functions.service";

@Component({
  selector: "app-bank-facilities",
  templateUrl: "./bank-facilities.component.html",
  styleUrls: ["./bank-facilities.component.scss"],
})
export class BankFacilitiesComponent implements OnInit {
  @ViewChild("categoryTab", { static: true }) categoryTab: TabsetComponent;
  loader: boolean;
  loader2: boolean;
  sortedValue: boolean;
  category: number;
  take: number;
  skip: number;
  bankFacilitiesPage: GetBankFacilitiesPageItemsModel;

  bankFacilitiesItemsTmp: BankFacilitieItemsModel[];
  bankFacilitiesItems: BankFacilitieItemsModel[];

  constructor(
    private bankFacilitiesService: BankFacilitiesService,
    public utilityFunctions: UtilityFunctionsService,
    private httpService: HttpServices
  ) {
    this.bankFacilitiesPage = new GetBankFacilitiesPageItemsModel();
    this.bankFacilitiesPage.banner = new BannerSCModel();
    this.bankFacilitiesPage.bfCategories = new Array<
      BankFacilitieCategoriesModel
    >();
    this.bankFacilitiesItems = new Array<BankFacilitieItemsModel>();
    this.bankFacilitiesItemsTmp = new Array<BankFacilitieItemsModel>();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.sortedValue = false;
    this.category = 0;
    this.skip = 0;
    this.take = 20;
    this.loader = true;
    this.loader2 = false;
    this.httpService.getBankFacilitiesPageItems().subscribe((res) => {
      this.bankFacilitiesPage = res;
      this.bankFacilitiesPage.bfCategories.sort((a: any, b: any) => {
        if (a["value"] < b["value"]) {
          return this.sortedValue ? 1 : -1;
        }
        if (a["value"] > b["value"]) {
          return this.sortedValue ? -1 : 1;
        }

        return 0;
      });
      this.sortedValue = !this.sortedValue;
      this.loader = false;
      window.scrollTo(0, 0);
    });
  }

  onSwitchCategory(event: number): void {
    this.loader2 = true;
    this.category = event;
    let createUtility = new BankFacilitiesUtilityModel();
    createUtility.skip = this.skip;
    createUtility.take = this.take;
    createUtility.category = this.category;
    this.httpService.getAllBankFacilities(createUtility).subscribe((res) => {
      this.bankFacilitiesItems = res;
      this.bankFacilitiesItemsTmp = this.bankFacilitiesItems;
      this.loader2 = false;
    });
  }
}
