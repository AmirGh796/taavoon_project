import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AboutUsService {
  constructor(private httpClient: HttpClient) {}
}
