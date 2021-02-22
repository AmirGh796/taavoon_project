import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
  SignUpModel,
  SignInModel,
  ForgotPasswordModel,
} from "../shared/models/Register.Model";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { HttpServices } from "../shared/services/HttpServices.service";
import { LookUpTable } from "../shared/models/MainSite.model";

@Injectable()
export class AuthService {
  tokenHelper: JwtHelperService;
  private _isCreateToken: boolean;

  public set setIsCreateToken(createToken: boolean) {
    this._isCreateToken = createToken;
  }

  public get getIsCreateToken(): boolean {
    return this._isCreateToken;
  }

  constructor(
    private httpService: HttpServices,
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.tokenHelper = new JwtHelperService();
    this.setIsCreateToken = false;
  }

  public setNotifInLStorage(
    notifValue: number,
    notifType: "msg" | "shop"
  ): void {
    switch (notifType) {
      case "msg":
        localStorage.setItem("MsgNotifCount", notifValue.toString());
        break;
      default:
        break;
    }
  }

  public getNotifInLStorage(notifType: "msg" | "shop"): number {
    switch (notifType) {
      case "msg":
        let msgVal: string = localStorage.getItem("MsgNotifCount");
        return parseInt(msgVal && msgVal.length ? msgVal : "0");
      default:
        break;
    }
  }

  // public viewSite(): void {
  //   if (
  //     !this.cookieService.get("user_vp") &&
  //     !this.cookieService.get("user_vp").length
  //   ) {
  //     this.httpService
  //       .saveUsersClickedOrView({
  //         forUserId: this.getUserAccount()?.UserId,
  //         forSection: 0,
  //       })
  //       .subscribe((_) => {
  //         this.cookieService.set(
  //           "user_vp",
  //           "1",
  //           1,
  //           null,
  //           environment.cookieDomain,
  //           false,
  //           "Lax"
  //         );
  //       });
  //   } else if (
  //     this.cookieService.get("user_vp") &&
  //     this.cookieService.get("user_vp").length &&
  //     this.cookieService.get("user_vp") === "0"
  //   ) {
  //     this.httpService
  //       .saveUsersClickedOrView({
  //         forUserId: this.getUserAccount()?.UserId,
  //         forSection: 0,
  //       })
  //       .subscribe((_) => {
  //         this.cookieService.set(
  //           "user_vp",
  //           "1",
  //           1,
  //           null,
  //           environment.cookieDomain,
  //           false,
  //           "Lax"
  //         );
  //       });
  //   } else {
  //     return;
  //   }
  // }

  // public descViewSite(): void {
  //   this.cookieService.set(
  //     "user_vp",
  //     "0",
  //     1,
  //     null,
  //     environment.cookieDomain,
  //     false,
  //     "Lax"
  //   );
  // }

  public getUserAccount(): any {
    if (
      this.cookieService.get("tvnrntr_user_access_token") &&
      this.cookieService.get("tvnrntr_user_access_token").length
    ) {
      return this.tokenHelper.decodeToken(
        this.cookieService.get("tvnrntr_user_access_token")
      );
    } else {
      return null;
    }
  }

  public getToken(): string {
    return this.cookieService.get("tvnrntr_user_access_token");
  }

  public setUserToken(token: string): void {
    if (this.getToken() || this.getToken().length) {
      this.cookieService.delete("tvnrntr_user_access_token");
    }

    this.cookieService.set(
      "tvnrntr_user_access_token",
      token,
      1,
      null,
      environment.cookieDomain,
      false,
      "Lax"
    );
  }

  public isUserTokenExpired(): boolean {
    if (
      this.cookieService.get("tvnrntr_user_access_token") &&
      this.cookieService.get("tvnrntr_user_access_token").length
    ) {
      return this.tokenHelper.isTokenExpired(
        this.cookieService.get("tvnrntr_user_access_token")
      );
    } else {
      return false;
    }
  }

  public logOut(userId: string): Observable<void> {
    this.deleteCookie();
    return Observable.create((observer: Subject<void>) => {
      this.removeTempFiles(userId).subscribe(() => {
        this.deleteCookie();
        localStorage.clear();
        // this.router.navigateByUrl("/register");
        this.setIsCreateToken = false;
        observer.next();
      });
    });
  }

  public deleteCookie(): void {
    this.cookieService.delete(
      "tvnrntr_user_access_token",
      null,
      environment.cookieDomain,
      false,
      "Lax"
    );
  }

  // public resultUserAuthenticated(): LookUpTable {
  //   if (this.getToken() && this.getToken().length) {
  //     this.isUserAuthenticated(this.getUserAccount().UserId).subscribe(
  //       (resultAuth) => {
  //         return resultAuth;
  //       }
  //     );
  //   } else {
  //     return {
  //       id: 0,
  //       value: -5,
  //       title:
  //         "کاربر گرامی، لطفا ابتدا در سایت ثبت نام کنید و سپس اقدام به تکمیل و ارسال فرم نمایید",
  //       activated: true,
  //     };
  //   }
  // }

  public signUp(data: SignUpModel): Observable<string> {
    const url = environment.dataApiUrl + "/UserAccount/SignUpUser";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<string>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public signIn(data: SignInModel): Observable<string> {
    const url = environment.dataApiUrl + "/UserAccount/SignInUser";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<string>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public forgotPassword(data: ForgotPasswordModel): Observable<number> {
    const url = environment.dataApiUrl + "/UserAccount/ForgotPassword";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public isUsePhoneNumber(data: SignUpModel): Observable<number> {
    const url = environment.dataApiUrl + "/UserAccount/IsUsePhoneNumber";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public countHasNewMessage(userId: string): Observable<number> {
    const url =
      environment.dataApiUrl + "/UserAccount/CountHasNewMessage/" + userId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);

    return this.httpClient
      .get<number>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public isUserAuthenticated(userId: string): Observable<LookUpTable> {
    const url =
      environment.dataApiUrl + `/UserAccount/GetAuthenticatedResult/${userId}`;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);

    return this.httpClient
      .get<LookUpTable>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public removeTempFiles(userId: string): Observable<void> {
    const url =
      environment.dataApiUrl + "/UserAccount/RemoveTempFiles/" + userId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<void>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
