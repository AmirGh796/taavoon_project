import { Injectable } from "@angular/core";
import { UserSendMessageModel } from "../shared/models/MainSite.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class ContactUsService {
  constructor(private httpClient: HttpClient) {}

  public postAccordionItem(data: UserSendMessageModel): Observable<number> {
    const url = environment.dataApiUrl + "/MainSite/SendMessage";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<number>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
