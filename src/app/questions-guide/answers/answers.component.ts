import { Component, OnInit } from "@angular/core";
import { HttpServices } from "src/app/shared/services/HttpServices.service";
import { ActivatedRoute } from "@angular/router";
import { GuideItemsModel } from "src/app/shared/models/MainSite.model";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.scss"],
})
export class AnswersComponent implements OnInit {
  itemId: number;
  loader: boolean;
  guideItem: GuideItemsModel;

  constructor(
    private httpService: HttpServices,
    private route: ActivatedRoute
  ) {
    this.guideItem = new GuideItemsModel();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = true;
    this.itemId = parseInt(this.route.snapshot.params.itemId);
    this.httpService.getGuideById(this.itemId).subscribe((resultItem) => {
      this.guideItem = resultItem;
      this.loader = false;
      window.scrollTo(0, 0);
    });
  }
}
