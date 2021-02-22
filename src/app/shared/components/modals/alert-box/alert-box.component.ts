import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MDBModalRef } from "ng-uikit-pro-standard";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UtilityFunctionsService } from "src/app/shared/services/utility-functions.service";

@Component({
  selector: "app-alert-box",
  templateUrl: "./alert-box.component.html",
  styleUrls: ["./alert-box.component.scss"],
})
export class AlertBoxComponent implements OnInit, AfterViewInit {
  title: string;
  buttonOperation: number;
  description: string;

  constructor(
    private router: Router,
    public modalRef: MDBModalRef,
    public utilityFunctions: UtilityFunctionsService
  ) {}

  ngAfterViewInit(): void {
    let modal = document.querySelectorAll(".modal-dynamic");
    for (let index = 0; index < modal.length; index++) {
      (modal[index] as HTMLElement).style.marginTop = "140px";
    }
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {}

  goToRegister(): void {
    this.utilityFunctions.saveFromRoute();
    this.router.navigateByUrl("/register");
    this.modalRef.hide();
  }

  goToUserPanel(): void {
    window.location.href = environment.userPanel + "/home";
  }

  goToConfirmPhone(): void {
    this.utilityFunctions.saveFromRoute();
    window.location.href =
      environment.userPanel + "/utilitys/confirm-phoneNumber";
  }
}
