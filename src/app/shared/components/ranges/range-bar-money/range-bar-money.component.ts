import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  AfterContentInit,
} from "@angular/core";
import { MdbRangeInputComponent } from "ng-uikit-pro-standard";
import { moneySeparator } from "src/app/shared/UtilityFunctions";

@Component({
  selector: "range-bar-money",
  templateUrl: "./range-bar-money.component.html",
  styleUrls: ["./range-bar-money.component.scss"],
})
export class RangeBarMoneyComponent
  implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild("rangeInput") rangeInput: MdbRangeInputComponent;
  @Input("stepInput") stepInput: number;
  @Input("minInput") minInput: number;
  @Input("maxInput") maxInput: number;
  @Output() resultMoney = new EventEmitter<string>();

  textTransform: any;
  maxPrice: string;
  minPrice: string;

  constructor() {}

  ngAfterContentInit(): void {
    this.minPrice = moneySeparator(this.minInput.toString());
    this.maxPrice = moneySeparator(this.maxInput.toString());
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {}

  onRangeValueChange(event: MdbRangeInputComponent): void {
    this.textTransform.innerText = "";
    this.resultMoney.emit(event.value);
    this.textTransform.innerText = moneySeparator(event.value) + " تومان";
  }

  moneySeparator(value: string): string {
    value += "";
    let x = value.split(".");
    let y = x[0];
    let z = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
    return y + z;
  }

  ngAfterViewInit(): void {
    let cloudElement = document.querySelector(
      ".range-cloud span"
    ) as HTMLElement;
    let rangeElement: any = document.getElementsByClassName("range-cloud")[0];
    this.textTransform = document.getElementsByClassName("text-transform")[0];

    rangeElement.style.cssText =
      "width: 60%; font-size: 26px; height: 50px; border-radius: 12px; top: -46px;";
    this.textTransform.style.cssText = "text-align: center; min-width: 210px;";

    if (window.innerWidth < 556) {
      cloudElement.style.fontSize = "16px";
    }

    if (window.innerWidth < 420) {
      cloudElement.style.fontSize = "12px";
    }
  }
}
