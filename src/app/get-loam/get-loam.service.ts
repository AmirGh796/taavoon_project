import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  LoanPageParametersModel,
  ApplyingForLoanModel,
} from "../shared/models/MainSite.model";
import { AuthService } from "../auth/auth.service";
import { UserConfirmFormBuyLoanModel, UserBuyLoanInfoModel, UserAlertMessagesModel } from "../shared/models/UserInformation.model";
import { SiteErrorEditingModel } from '../shared/models/SiteErrorEditing.model';

@Injectable()
export class GetLoamService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public getLoanPageParameters(): Observable<LoanPageParametersModel> {
    const url = environment.dataApiUrl + "/MainSite/GetLoanPageParameters";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<LoanPageParametersModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public validateLoanParams(data: ApplyingForLoanModel): Observable<number> {
    const url = environment.dataApiUrl + "/MainSite/ValidateLoanParams";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getUserConfirmFormBuyLoan(
    userId: string
  ): Observable<UserConfirmFormBuyLoanModel> {
    const url =
      environment.dataApiUrl + "/MainSite/SendUserConfirmFormBuyLoan/" + userId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .get<UserConfirmFormBuyLoanModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public cancelBuyLoanOperation(userId: string): Observable<boolean> {
    const url =
      environment.dataApiUrl + "/MainSite/CancelBuyLoanOperation/" + userId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .put<boolean>(url, null, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public createUserLoan(userId: string): Observable<string> {
    const url = environment.dataApiUrl + "/MainSite/CreateUserLoan/" + userId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .get<string>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getFactorForBuyLoan(trackingCode: string): Observable<UserBuyLoanInfoModel> {
    const url = environment.dataApiUrl + "/MainSite/GetFactorForBuyLoan/" + trackingCode;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .get<UserBuyLoanInfoModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public postUserAlertMessage(data: UserAlertMessagesModel): Observable<number> {
    const url = environment.dataApiUrl + "/MainSite/SendUserAlertMessage/";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllSiteErrors(): Observable<SiteErrorEditingModel[]> {
    const url = environment.dataApiUrl + '/MainSite/GetAllSiteErrors';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .get<SiteErrorEditingModel[]>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
