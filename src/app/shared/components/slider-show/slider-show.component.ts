import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { LinksEventModel } from "../../models/MainSite.model";
import { UtilityFunctionsService } from "../../services/utility-functions.service";
import { SliderHomeModel, SliderShowModel } from "./slider-show.model";

@Component({
  selector: "slider-show",
  templateUrl: "./slider-show.component.html",
  styleUrls: ["./slider-show.component.scss"],
})
export class SliderShowComponent implements OnInit, AfterViewInit {
  @Input("slidesConfig") slidesConfig: SliderShowModel;
  @Output() slideEventsOut = new EventEmitter<LinksEventModel>();

  constructor(public utilityFunctions: UtilityFunctionsService) {
    this.slidesConfig = new SliderShowModel();
  }

  ngAfterViewInit(): void {
    document
      .querySelectorAll("mdb-carousel .carousel-indicators")
      .forEach((element: HTMLElement) => {
        element.style.padding = "0px";
      });
    this.initStyles();
  }

  initStyles(): void {
    let nextSlide: any = document.getElementsByClassName(
      "carousel-control-next"
    );
    let prevSlide: any = document.getElementsByClassName(
      "carousel-control-prev"
    );
    nextSlide[0].style.zIndex = "1000";
    prevSlide[0].style.zIndex = "1000";

    document
      .querySelectorAll(".carousel-control-prev .carousel-control-prev-icon")
      .forEach((element: HTMLElement) => {
        element.style.backgroundColor = "#9701ab";
        element.style.borderRadius = "100%";
        element.style.padding = "20px";
      });
    document
      .querySelectorAll(".carousel-control-next .carousel-control-next-icon")
      .forEach((element: HTMLElement) => {
        element.style.backgroundColor = "#9701ab";
        element.style.borderRadius = "100%";
        element.style.padding = "20px";
      });
  }

  ngOnInit(): void {}

  checkedSlideHasUtility(slide: SliderHomeModel): boolean {
    if (slide.backgroundUrl && slide.backgroundUrl.length) {
      if (
        (slide.title && slide.title?.length) ||
        (slide.description && slide.description?.length)
      ) {
        return true;
      }
    }
    return false;
  }

  exportLink(id: number, linkType: number, link: string): void {
    let outEvents: LinksEventModel;
    outEvents = {
      sectionType: "slider",
      itemId: id,
      linkType: linkType,
      linkUrl: link,
    };
    this.slideEventsOut.emit(outEvents);
  }
}
