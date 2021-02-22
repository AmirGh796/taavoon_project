import { Component, OnInit } from "@angular/core";
import { HttpServices } from "../shared/services/HttpServices.service";
import { AboutUsPageModel } from "../shared/models/ContentObjects.model";
import { SocialLinksModel } from "../shared/models/MainSite.model";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent implements OnInit {
  loader: boolean;
  aboutUsPage: AboutUsPageModel;

  constructor(private httpService: HttpServices) {
    this.aboutUsPage = new AboutUsPageModel();
    this.aboutUsPage.socialLinks = new Array<SocialLinksModel>();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loader = true;
    this.httpService.getAboutUsPageItems().subscribe((res) => {
      this.aboutUsPage = res;
      this.loader = false;
      window.scrollTo(0, 0);
    });
  }
}
