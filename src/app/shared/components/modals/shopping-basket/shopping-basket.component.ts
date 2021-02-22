import { Component, OnInit } from "@angular/core";
import { MDBModalRef } from "ng-uikit-pro-standard";

@Component({
  selector: "app-shopping-basket",
  templateUrl: "./shopping-basket.component.html",
  styleUrls: ["./shopping-basket.component.scss"],
})
export class ShoppingBasketComponent implements OnInit {
  shoppingName: string;

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}
}
