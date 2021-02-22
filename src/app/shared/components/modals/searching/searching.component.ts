import { Component, OnInit } from "@angular/core";
import { MDBModalRef } from "ng-uikit-pro-standard";

@Component({
  selector: "app-searching",
  templateUrl: "./searching.component.html",
  styleUrls: ["./searching.component.scss"],
})
export class SearchingComponent implements OnInit {
  shoppingName: string;

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}
}
