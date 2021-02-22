import { Component, OnInit } from "@angular/core";
import { HttpServices } from "../shared/services/HttpServices.service";
import { QuestionsGuideService } from "./questions-guide.service";
import { GetQuestionsGuideItemsModel } from "../shared/models/ContentObjects.model";
import {
  BannerSCModel,
  GuideItemsModel,
  PagesSectionsModel,
  AskedQuestionsModel,
} from "../shared/models/MainSite.model";

@Component({
  selector: "app-questions-guide",
  templateUrl: "./questions-guide.component.html",
  styleUrls: ["./questions-guide.component.scss"],
})
export class QuestionsGuideComponent implements OnInit {
  loader: boolean;
  qusetionPage: GetQuestionsGuideItemsModel;

  constructor(
    private httpService: HttpServices,
    private questionService: QuestionsGuideService
  ) {
    this.qusetionPage = new GetQuestionsGuideItemsModel();
    this.qusetionPage.banner = new BannerSCModel();
    this.qusetionPage.sections = new Array<PagesSectionsModel>();
    this.qusetionPage.itemsSection = new Array<GuideItemsModel>();
    this.qusetionPage.qaItems = new Array<AskedQuestionsModel>();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = true;
    this.httpService.getAllQuestionGuidePageItems().subscribe((res) => {
      this.qusetionPage = res;
      this.loader = false;
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.initStyles();
      }, 500);
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
