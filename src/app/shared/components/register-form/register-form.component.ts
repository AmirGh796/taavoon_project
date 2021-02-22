import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  FormGeneratorPagesModel,
  FormGeneratorControlsModel,
  UserFormValuesModel,
} from "../../models/MainSite.model";
import { IDatePickerConfig } from "ng2-jalali-date-picker";
import * as moment from "jalali-moment";
import { checkFormats, generateRandomId } from "../../UtilityFunctions";
import { imageFormats } from "../../RegexPatterns";
import { ModalsConfigurationsService } from "../../services/ObjectsConfig.service";
import { SendFormValuesAndFilesModel } from "../../models/ContentObjects.model";

@Component({
  selector: "register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  @ViewChild("formChilds", { static: true }) formChilds: ElementRef;
  @Input("FormPage") formPage: FormGeneratorPagesModel;
  @Input("IsAuthenticate") isAuthenticate: boolean;
  @Input("FormControls") formControls: FormGeneratorControlsModel[];
  @Output() outPutAllData = new EventEmitter<SendFormValuesAndFilesModel>();

  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  imageFiles: File[];
  formValues: UserFormValuesModel[];
  radioBtns: FormGeneratorControlsModel[];

  datePickerConfig: IDatePickerConfig = {
    drops: "down",
    format: "YYYY/MM/DD",
  };

  constructor(private configObjects: ModalsConfigurationsService) {
    this.formControls = new Array<FormGeneratorControlsModel>();
    this.imageFiles = new Array<File>();
    this.formValues = new Array<UserFormValuesModel>();
    this.radioBtns = new Array<FormGeneratorControlsModel>();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    if (this.formControls && this.formControls.length) {
      this.formControls.forEach((mainElement) => {
        if (mainElement.forElement && mainElement.forElement.length) {
          this.formControls.map((m) => {
            if (m.elementName === mainElement.forElement) {
              if (m.child === undefined)
                m.child = new Array<FormGeneratorControlsModel>();
              m.child.push(mainElement);
            }
          });
        }
        if (
          mainElement.controlType === 3 &&
          mainElement.elementType === "radio"
        ) {
          this.formControls.forEach((elementRB) => {
            if (
              elementRB.controlType === 3 &&
              mainElement.elementName === elementRB.elementName &&
              mainElement.elementId !== elementRB.elementId
            ) {
              if (mainElement.child === undefined)
                mainElement.child = new Array<FormGeneratorControlsModel>();
              mainElement.child.push(elementRB);
              mainElement.child.push(mainElement);
              this.formControls = this.formControls.filter(
                (f) => f.id !== elementRB.id
              );
              elementRB.elementType = "radio-none";
            }
          });
        }
      });
      this.formControls = this.formControls.filter(
        (f) => !f.forElement || !f.forElement.length
      );
    }
    this.sortFormControls(this.formControls, "elementOrder");
  }

  sortFormControls(
    controls: FormGeneratorControlsModel[],
    orderBy: string
  ): void {
    if (!controls || !controls.length) return;

    let sorted: boolean = false;

    controls.sort((a: any, b: any) => {
      if (a[orderBy] < b[orderBy]) {
        return sorted ? 1 : -1;
      }
      if (a[orderBy] > b[orderBy]) {
        return sorted ? -1 : 1;
      }

      return 0;
    });

    sorted = !sorted;
  }

  onUploadImage(file: any): void {
    if (file.target.files && file.target.files[0]) {
      if (checkFormats(file, imageFormats)) {
        this.imageFiles.push(file.target.files[0]);
        let reader = new FileReader();
        reader.onload = (e: any) => {};
        reader.readAsDataURL(this.imageFiles[this.imageFiles.length - 1]);
      } else {
        alert("فرمت انتخاب شده صحیح نمیباشد");
      }
    }
  }

  setRBChecked(control: FormGeneratorControlsModel): void {
    this.formControls.forEach((element) => {
      if (control.elementName === element.elementName) {
        element.child.forEach((child) => {
          if (control.elementId !== child.elementId) {
            child.checked = false;
          }
        });
      }
    });
  }

  selectItemInList(event: any, parentId: number): void {
    let index = event.srcElement.selectedIndex;
    console.log(event);
    this.formControls.forEach((parent) => {
      if (parent.id === parentId) {
        parent.child.forEach((element, childIndex) => {
          if (childIndex === index) {
            parent.child[childIndex].checked = true;
            parent.child[childIndex].elementValue = element.elementValue;
          } else {
            parent.child[childIndex].checked = false;
            parent.child[childIndex].elementValue = null;
          }
        });
      }
    });
  }

  onSendDataFromForm(): void {
    if (!this.isAuthenticate) {
      this.configObjects.alertBoxShow(
        "اخطار",
        "کاربر گرامی، لطفا ابتدا در سایت ثبت نام کنید و سپس اقدام به تکمیل و ارسال فرم نمایید",
        1
      );

      return;
    }

    for (let index = 0; index < this.formControls.length; index++) {
      if (
        this.formControls[index].controlType === 0 ||
        this.formControls[index].controlType === 1 ||
        this.formControls[index].controlType === 2 ||
        this.formControls[index].controlType === 3 ||
        this.formControls[index].controlType === 4 ||
        this.formControls[index].controlType === 15 ||
        this.formControls[index].controlType === 19
      ) {
        if (
          this.formControls[index].required &&
          (!this.formControls[index].elementValue ||
            !this.formControls[index].elementValue.length)
        ) {
          this.configObjects.alertBoxShow(
            "اخطار",
            "لطفا تمامي فيلد هاي الزامي فرم را تكميل نماييد."
          );
          return;
        }

        if (
          this.formControls[index].maxLength &&
          this.formControls[index].maxLength > 0 &&
          this.formControls[index].elementValue &&
          this.formControls[index].elementValue.length >
            this.formControls[index].maxLength
        ) {
          this.configObjects.alertBoxShow(
            "اخطار",
            "یکی از فیلد های فرم ارسالیتان ، تعداد کاراکتر هایش بیشتر از حدمجاز شده . لطفا دوباره برسی کنید ."
          );
          this.outPutAllData.emit(null);
          return;
        }

        let createFormValue = new UserFormValuesModel();

        createFormValue.id = generateRandomId();
        createFormValue.formValuesId = null;
        createFormValue.activate = true;

        if (
          this.formControls[index].controlType === 1 ||
          this.formControls[index].controlType === 2 ||
          this.formControls[index].controlType === 15
        ) {
          createFormValue.title = this.formControls[index].title;
          createFormValue.value = this.formControls[index].elementValue;
          createFormValue.controlType = this.formControls[index].controlType;
        }

        if (this.formControls[index].controlType === 3) {
          if (
            this.formControls[index].child &&
            this.formControls[index].child?.length
          ) {
            this.formControls[index].child.forEach((child) => {
              let createChild = new UserFormValuesModel();
              createChild = {
                id: -1,
                controlType: 3,
                formValuesId: null,
                title: child.title,
                value: child.checked ? "true" : "false",
                controlSeries: child.elementName,
                activate: true,
              };
              this.formValues.push(createChild);
            });
          }
        }

        if (this.formControls[index].controlType === 4) {
          createFormValue.title = this.formControls[index].title;
          createFormValue.value = this.formControls[index].checked
            ? "true"
            : "false";
          createFormValue.controlType = this.formControls[index].controlType;
        }

        if (this.formControls[index].controlType === 19) {
          this.formControls[index].child.forEach((child) => {
            if (child.checked) {
              let createChild = new UserFormValuesModel();
              createChild = {
                id: -1,
                controlType: 19,
                formValuesId: null,
                title: "لیست کشویی",
                value: child.title,
                controlSeries: child.forElement,
                activate: true,
              };
              this.formValues.push(createChild);
            }
          });
        }

        if (
          this.formControls[index].controlType !== 3 &&
          this.formControls[index].controlType !== 19
        )
          this.formValues.push(createFormValue);
      }
    }

    if (this.formValues && this.formValues.length) {
      let createSendFormAllData = new SendFormValuesAndFilesModel();
      createSendFormAllData.formValues = this.formValues;
      createSendFormAllData.files = this.imageFiles;
      this.outPutAllData.emit(createSendFormAllData);
    } else {
      this.outPutAllData.emit(null);
    }
  }
}
