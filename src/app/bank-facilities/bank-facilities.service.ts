import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  UserBankFacilitiesModel,
  ReturnZarinPalResultModel,
  UserRequestBFItemsModel,
} from "../shared/models/MainSite.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class BankFacilitiesService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // public postBankFacilitiesRequest(
  //   data: UserBankFacilitiesModel
  // ): Observable<number> {
  //   const url = environment.dataApiUrl + "/MainSite/AddBankFacilitiesRequest";
  //   let headers = new HttpHeaders();
  //   headers = headers.set("Content-Type", "application/json; charset=utf-8");
  //   headers = headers.set(
  //     "Authorization",
  //     `Bearer ${this.authService.getToken()}`
  //   );

  //   return this.httpClient
  //     .post<number>(url, data, { headers: headers })
  //     .pipe((res) => {
  //       const p = res || null;
  //       return p;
  //     });
  // }

  // public buyDiscountCode(
  //   data: UserBankFacilitiesModel
  // ): Observable<ReturnZarinPalResultModel> {
  //   const url = environment.dataApiUrl + "/MainSite/BuyDiscountCode";
  //   let headers = new HttpHeaders();
  //   headers = headers.set("Content-Type", "application/json; charset=utf-8");
  //   headers = headers.set(
  //     "Authorization",
  //     `Bearer ${this.authService.getToken()}`
  //   );

  //   return this.httpClient
  //     .post<ReturnZarinPalResultModel>(url, data, { headers: headers })
  //     .pipe((res) => {
  //       const p = res || null;
  //       return p;
  //     });
  // }

  // public existsDiscountCodeInSeriByDiscountId(
  //   discountId: string
  // ): Observable<boolean> {
  //   const url =
  //     environment.dataApiUrl +
  //     `/MainSite/ExistsDiscountCodeInSeriByDiscountId/${discountId}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.set("Content-Type", "application/json; charset=utf-8");
  //   headers = headers.set(
  //     "Authorization",
  //     `Bearer ${this.authService.getToken()}`
  //   );

  //   return this.httpClient
  //     .get<boolean>(url, { headers: headers })
  //     .pipe((res) => {
  //       const p = res || null;
  //       return p;
  //     });
  // }

  public sendRequestBFItemsFromUser(
    data: UserRequestBFItemsModel
  ): Observable<ReturnZarinPalResultModel | number> {
    const url = environment.dataApiUrl + `/MainSite/SendRequestBFItemsFromUser`;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .post<ReturnZarinPalResultModel | number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
