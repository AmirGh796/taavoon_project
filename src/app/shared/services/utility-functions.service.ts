import { HostListener, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "jalali-moment";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";

@Injectable()
export class UtilityFunctionsService {
  constructor(private router: Router, private cookieService: CookieService) {}

  @HostListener("window:resize")
  public onWindowResize(): string {
    let width = window.innerWidth;

    if (width > 0 && width <= 350) {
      return "sm";
    } else if (width > 350 && width <= 576) {
      return "md";
    } else if (width > 576 && width <= 768) {
      return "lg";
    } else if (width > 768 && width <= 991) {
      return "xl";
    } else {
      return "2x";
    }
  }

  public checkFormats(file: any, formatSelection: string[]): boolean {
    let templateImage = file.target.files[0];
    let formats = templateImage.name.split(".");
    let lastImageFormat = formats[formats.length - 1].toLowerCase();
    for (let index = 0; index < formatSelection.length; index++) {
      if (lastImageFormat === formatSelection[index]) {
        return true;
      }
    }
    return false;
  }

  public moneySeparator(value: string): string {
    value += "";
    let x = value.split(".");
    let y = x[0];
    let z = x.length > 1 ? "." + x[1] : "";
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
    return y + z;
  }

  public validationImageSize(image: File, size: number): boolean {
    if (image.size <= size) {
      return true;
    }
    return false;
  }

  public generateRandomId(): number {
    let date = new Date();
    return -(
      Math.floor(Math.random() * 1000 + 1) +
      date.getSeconds() +
      date.getMinutes() +
      date.getHours()
    );
  }

  public convertObjectLowecaseToUppercase(data: any[]): any[] {
    for (let i = 0; i < data.length; i++) {
      let a = data[i];
      for (let key in a) {
        let temp;
        if (a.hasOwnProperty(key)) {
          temp = a[key];
          delete a[key];
          a[key.charAt(0).toUpperCase() + key.substring(1)] = temp;
        }
      }
      data[i] = a;
    }
    return data;
  }

  public sortBy(by: string | any, arr: any[], sorted: boolean): boolean {
    arr.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return sorted ? -1 : 1;
      }

      return 0;
    });

    return !sorted;
  }

  public dateConvertToPersian(getTime: any): any {
    let persianDate = moment(getTime)
      .locale("fa")
      .format("dddd, MMMM DD YYYY, h:mm:ss a");
    return persianDate;
  }

  public dateConvertToPersian_V2(getTime: any): any {
    let persianDate = moment(getTime).locale("fa").format("YYYY/M/D");
    return persianDate;
  }

  public formatBytes(bytes: number, decimals: number = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  public fixPhoneNumber(phoneNumber: string): string {
    return phoneNumber.substr(0, 1) === "0"
      ? phoneNumber.slice(1, phoneNumber.length)
      : phoneNumber;
  }

  public saveFromRoute(): void {
    //localStorage.setItem("fromRoute", this.router.url);
    this.cookieService.set(
      "tvn_fromRoute",
      window.location.href,
      1,
      null,
      environment.cookieDomain,
      false,
      "Lax"
    );
  }

  public checkHasFromRoute(): boolean {
    // return localStorage.getItem("fromRoute") &&
    //   localStorage.getItem("fromRoute")?.length
    //   ? true
    //   : false;
    return this.cookieService.get("tvn_fromRoute") &&
      this.cookieService.get("tvn_fromRoute")?.length
      ? true
      : false;
  }

  public goFromRoute(): void {
    let url = this.cookieService.get("tvn_fromRoute");
    this.cookieService.delete(
      "tvn_fromRoute",
      null,
      environment.cookieDomain,
      false,
      "Lax"
    );
    window.location.href = url;
    // this.router
    //   .navigateByUrl(this.cookieService.get("tvn_fromRoute"))
    //   .then(() => {
    //     //localStorage.removeItem("fromRoute");
    //     this.cookieService.delete(
    //       "tvn_fromRoute",
    //       null,
    //       environment.cookieDomain,
    //       false,
    //       "Lax"
    //     );
    //     window.location.reload();
    //   });
  }

  public expiredDateShow(exDate: string): string {
    exDate = this.dateConvertToPersian_V2(exDate);
    // console.log(exDate);
    // let date = new Date(exDate);
    // let months = date.toLocaleDateString();
    // console.log(date);
    // console.log(months);
    return exDate;
  }
}
