import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-scroll-up",
  templateUrl: "./scroll-up.component.html",
  styleUrls: ["./scroll-up.component.scss"],
})
export class ScrollUpComponent implements OnInit {
  scrollElement: HTMLElement;

  constructor() {}

  ngOnInit(): void {
    this.scrollElement = document.getElementById("scroll-panel");
  }

  @HostListener("window:scroll", ["$event"]) // for window scroll events
  onScroll(event: any) {
    if (
      document.body.scrollTop > screen.height ||
      document.documentElement.scrollTop > screen.height
    ) {
      this.scrollElement.style.transform = "scale(1)";
    } else {
      this.scrollElement.style.transform = "scale(0)";
    }
  }

  scrollUp(): void {
    window.scrollTo(0, 0);
  }
}
