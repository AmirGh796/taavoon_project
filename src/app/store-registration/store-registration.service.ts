import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StoreRegistrationModel } from "../shared/models/StoreRegistration.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class StoreRegistrationService {
  constructor(private httpClient: HttpClient) {}

  public postRegistrationStore(data: StoreRegistrationModel): Observable<any> {
    const url = environment.dataApiUrl + "/Register";
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.httpClient
      .post<any>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
