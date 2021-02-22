import { Component, OnInit, AfterViewInit } from "@angular/core";
import { moneySeparator } from "src/app/shared/UtilityFunctions";

@Component({
  selector: "app-sub-cat",
  templateUrl: "./sub-cat.component.html",
  styleUrls: ["./sub-cat.component.scss"],
})
export class SubCatComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {
    this.initData();
  }

  ngAfterViewInit(): void {
    let multiSlider = document.querySelectorAll("div.multi-range-field");
    for (let index = 0; index < multiSlider.length; index++) {
      (multiSlider[index] as HTMLElement).classList.remove(
        "mb-5",
        "mt-5",
        "my-5"
      );
      (multiSlider[index] as HTMLElement).style.margin = "0px";
    }
  }

  initData(): void {}

  convertMoney(price: number): string {
    return moneySeparator(price.toString()) + " تومان";
  }
}
