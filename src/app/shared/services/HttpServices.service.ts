import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import {
  GetNavigationBarModel,
  GetHomePageItemsModel,
  GetFooterItemsModel,
  GetLoanPageItemsModel,
  GetQuestionsGuideItemsModel,
  GetContactUsPageItemsModel,
  GetBankFacilitiesPageItemsModel,
  GetFormPageModel,
  AboutUsPageModel,
} from "../models/ContentObjects.model";
import {
  RichHelpsItemModel,
  BankFacilitiesUtilityModel,
  BankFacilitieItemsModel,
  NewsletterEmailsModel,
  GuideItemsModel,
  UserRedirectionItemsModel,
  RestApiLinkModel,
} from "../models/MainSite.model";
import { UsersClickedOnLinksModel } from "../models/UserInformation.model";

@Injectable()
export class HttpServices {
  private _loadNavbarData: boolean;
  private _loadFooterData: boolean;

  public get getLoadNavbarData(): boolean {
    return this._loadNavbarData;
  }

  public set setLoadNavbarData(data: boolean) {
    this._loadNavbarData = data;
  }

  public get getLoadFooterData(): boolean {
    return this._loadFooterData;
  }

  public set setLoadFooterData(data: boolean) {
    this._loadFooterData = data;
  }

  constructor(private httpClient: HttpClient) {
    this._loadNavbarData = this._loadFooterData = false;
  }

  public saveUsersClickedOrView(
    data: UsersClickedOnLinksModel
  ): Observable<void> {
    const url = environment.dataApiUrl + "/UserAccount/SaveUsersClickedOrView";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<void>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllItemsForNavigation(): Observable<GetNavigationBarModel> {
    const url = environment.dataApiUrl + "/MainSite/GetAllItemsForNavigation";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GetNavigationBarModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllFooterItems(): Observable<GetFooterItemsModel> {
    const url = environment.dataApiUrl + "/MainSite/GetAllFooterItems";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GetFooterItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllHomePageItems(): Observable<GetHomePageItemsModel> {
    const url = environment.dataApiUrl + "/MainSite/GetAllHomePageItems";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GetHomePageItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllLoanPageItems(): Observable<GetLoanPageItemsModel> {
    const url = environment.dataApiUrl + "/MainSite/GetAllLoanPageItems";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GetLoanPageItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllQuestionGuidePageItems(): Observable<GetQuestionsGuideItemsModel> {
    const url =
      environment.dataApiUrl + "/MainSite/GetAllQuestionGuidePageItems";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GetQuestionsGuideItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getBankFacilitiesPageItems(): Observable<GetBankFacilitiesPageItemsModel> {
    const url = environment.dataApiUrl + "/MainSite/GetBankFacilitiesPageItems";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GetBankFacilitiesPageItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getHelpersOfSectionItem(
    itemId: number
  ): Observable<RichHelpsItemModel> {
    const url =
      environment.dataApiUrl + "/MainSite/GetHelpersOfSectionItem/" + itemId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<RichHelpsItemModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getGuideById(id: number): Observable<GuideItemsModel> {
    const url = environment.dataApiUrl + "/MainSite/GetGuideById/" + id;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GuideItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllContactUsPageItems(): Observable<GetContactUsPageItemsModel> {
    const url = environment.dataApiUrl + "/MainSite/GetAllContactUsPageItems";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GetContactUsPageItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAllBankFacilities(
    data: BankFacilitiesUtilityModel
  ): Observable<BankFacilitieItemsModel[]> {
    const url = environment.dataApiUrl + "/MainSite/GetAllBankFacilities";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<BankFacilitieItemsModel[]>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getBankFacilitieByItemId(
    itemId: string
  ): Observable<BankFacilitieItemsModel> {
    const url =
      environment.dataApiUrl + "/MainSite/GetBankFacilitieByItemId/" + itemId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<BankFacilitieItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getBankFacilitieLast5Items(
    category: number
  ): Observable<BankFacilitieItemsModel[]> {
    const url =
      environment.dataApiUrl +
      "/MainSite/GetBankFacilitieLast5Items/" +
      category;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<BankFacilitieItemsModel[]>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getFormPageForFacilitieItem(
    itemId: string
  ): Observable<GetFormPageModel> {
    const url =
      environment.dataApiUrl +
      "/MainSite/GetFormPageForFacilitieItem/" +
      itemId;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<GetFormPageModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public getAboutUsPageItems(): Observable<AboutUsPageModel> {
    const url = environment.dataApiUrl + "/MainSite/GetAboutUsPageItems";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<AboutUsPageModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public saveEmailsForNews(data: NewsletterEmailsModel): Observable<number> {
    const url = environment.dataApiUrl + "/MainSite/SaveEmailsForNews";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public saveAndSendUserParamsToApiLink(
    requestTC: string
  ): Observable<UserRedirectionItemsModel> {
    const url =
      environment.dataApiUrl +
      `/MainSite/saveAndSendUserParamsToApiLink/${requestTC}`;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .get<UserRedirectionItemsModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public redirectToRestApiLinks(
    link: string,
    data: RestApiLinkModel
  ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<any>(link, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
