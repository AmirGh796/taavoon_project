import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BankFacilitieItemsModel } from "../../models/MainSite.model";
import { UtilityFunctionsService } from "../../services/utility-functions.service";

@Component({
  selector: "important-items-show",
  templateUrl: "./important-items-show.component.html",
  styleUrls: ["./important-items-show.component.scss"],
})
export class ImportantItemsShowComponent implements OnInit, AfterViewInit {
  @Input("importantItems")
  importantItems: BankFacilitieItemsModel[];
  @Input("routePath") routePath: string;

  constructor(
    private router: Router,
    public utilityFunctions: UtilityFunctionsService
  ) {
    this.importantItems = new Array<BankFacilitieItemsModel>();
  }

  ngAfterViewInit(): void {
    document
      .querySelectorAll("mdb-card-img img")
      .forEach((element: HTMLElement) => {
        element.style.height = "200px";
      });
  }

  slides: any = [[]];
  chunk(arr: any, chunkSize: any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {
    this.slides = this.chunk(this.importantItems, 3);
    this.importantItems.forEach((item) => {
      if (item.expiredDate && item.expiredDate.length) {
        item.expiredDate = this.utilityFunctions.expiredDateShow(
          item.expiredDate
        );
      }
    });
  }

  goToRoutePath(): void {
    this.router.navigateByUrl(this.routePath);
  }

  openCard(itemId: string): void {
    this.router.navigateByUrl(
      "/home/bank-facilities/bank-facilities-details/" + itemId
    );
  }
}
