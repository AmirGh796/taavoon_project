import { Component, OnInit } from "@angular/core";
import { MDBModalRef } from "ng-uikit-pro-standard";

@Component({
  selector: "app-images-box",
  templateUrl: "./images-box.component.html",
  styleUrls: ["./images-box.component.scss"],
})
export class ImagesBoxComponent implements OnInit {
  title: string;
  images: any[];
  mainImage: string;

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    if (this.images.length > 0) {
      this.mainImage = this.images[0].image;
    }
  }

  setImageToView(image: string): void {
    this.mainImage = image;
  }
}
