import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { LinksEventModel } from "../../models/MainSite.model";
import { UtilityFunctionsService } from "../../services/utility-functions.service";
import { FeturesSectionModel } from "./fetures-show.model";

@Component({
  selector: "fetures-show",
  templateUrl: "./fetures-show.component.html",
  styleUrls: ["./fetures-show.component.scss"],
})
export class FeturesShowComponent implements OnInit {
  @Input("feturesConfig") feturesConfig: FeturesSectionModel[];
  @Output() fetureEventsOut = new EventEmitter<LinksEventModel>();

  constructor(public utilityFunctions: UtilityFunctionsService) {}

  ngOnInit(): void {}

  exportLink(id: number, linkType: number, link: string): void {
    let outEvents: LinksEventModel;
    outEvents = {
      itemId: id,
      sectionType: "fetures",
      linkType: linkType,
      linkUrl: link,
    };
    this.fetureEventsOut.emit(outEvents);
  }
}
