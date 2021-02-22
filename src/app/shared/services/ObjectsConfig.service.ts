import {
  ModalOptions,
  MDBModalRef,
  MDBModalService,
} from "ng-uikit-pro-standard";
import { Injectable } from "@angular/core";
import { AlertBoxComponent } from "../components/modals/alert-box/alert-box.component";
import { ProgressPageComponent } from "../components/modals/progress-page/progress-page.component";

@Injectable()
export class ModalsConfigurationsService {
  private progressBarModalRef: MDBModalRef;
  private progressBarModalOptions: any;
  private openAlertBoxModal: MDBModalRef;
  private openAlertBoxModalOption: any;

  constructor(private modalService: MDBModalService) {}

  public hideProgressBar(): void {
    this.progressBarModalRef.hide();
  }

  public showProgressBar(): void {
    this.progressBarModalOptions = {
      backdrop: true,
      keyboard: false,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: "modal-sm modal-top-left",
      containerClass: "top",
      animated: true,
      data: {},
    };
    this.progressBarModalRef = this.modalService.show(
      ProgressPageComponent,
      this.progressBarModalOptions
    );
  }

  public alertBoxShow(
    title: string,
    description: string,
    buttonOperation: number = null
  ): void {
    this.openAlertBoxModalOption = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-md modal-top-left",
      containerClass: "top",
      animated: true,
      data: {
        title: title,
        description: description,
        buttonOperation: buttonOperation === null ? 0 : buttonOperation,
      },
    };
    this.openAlertBoxModal = this.modalService.show(
      AlertBoxComponent,
      this.openAlertBoxModalOption
    );
  }
}
