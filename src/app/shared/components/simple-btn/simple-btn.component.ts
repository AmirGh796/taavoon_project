import { Component, OnInit, Input, AfterViewInit } from "@angular/core";

@Component({
  selector: "simple-btn",
  templateUrl: "./simple-btn.component.html",
  styleUrls: ["./simple-btn.component.scss"],
})
export class SimpleBtnComponent implements OnInit, AfterViewInit {
  @Input("title") title: string;
  @Input("icon") icon: string;

  constructor() {}

  ngAfterViewInit(): void {
    (document.querySelectorAll("#smpIcon i")[0] as HTMLElement).style.margin =
      "0px";
  }

  ngOnInit(): void {}
}
