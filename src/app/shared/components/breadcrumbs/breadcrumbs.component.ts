import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UrlLinks } from "../../models/UrlLinks.model";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"],
})
export class BreadcrumbsComponent implements OnInit {
  routerLinks: UrlLinks[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getLinksFromUrl();
  }

  getLinksFromUrl(): void {
    let url = this.router.url;
    let links = url.split("/");

    for (let index = 0; index < links.length; index++) {
      let item = new UrlLinks;
      item.title = links[index];
      item.name = "";
      item.link = "";
      this.routerLinks.push(item);
    }
  }

  getLinksFromDatabase(): void {}
}
