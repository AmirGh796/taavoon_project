import { Component, OnInit } from "@angular/core";
import { MDBModalRef } from 'ng-uikit-pro-standard';

@Component({
  selector: "app-frame-box",
  templateUrl: "./frame-box.component.html",
  styleUrls: ["./frame-box.component.scss"],
})
export class FrameBoxComponent implements OnInit {
  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}
}
