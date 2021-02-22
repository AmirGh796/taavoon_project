import { Component, OnInit } from "@angular/core";
import { MDBModalRef } from "ng-uikit-pro-standard";

@Component({
  selector: "progress-page",
  templateUrl: "./progress-page.component.html",
  styleUrls: ["./progress-page.component.scss"],
})
export class ProgressPageComponent implements OnInit {

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}
}
