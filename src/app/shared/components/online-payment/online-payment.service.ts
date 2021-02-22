import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  RedirectToLinkModel,
  ReturnZarinPalResultModel,
  ZarinPalPGAuthorityModel,
} from "../../models/MainSite.model";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

@Injectable()
export class OnlinePaymentService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public bfRequestPaymentCheck(
    userId: string,
    data: ZarinPalPGAuthorityModel
  ): Observable<RedirectToLinkModel> {
    const url =
      environment.dataApiUrl + `/MainSite/BFRequestPaymentCheck/${userId}`;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .post<RedirectToLinkModel>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }

  public paymentBFItems(
    userId: string,
    orderId: string,
    bfInsertedId: number
  ): Observable<ReturnZarinPalResultModel> {
    const url =
      environment.dataApiUrl +
      `/MainSite/PaymentBFItems?userId=${userId}&orderId=${orderId}&bfId=${bfInsertedId}`;

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );

    return this.httpClient
      .get<ReturnZarinPalResultModel>(url, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
