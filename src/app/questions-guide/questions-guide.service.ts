import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class QuestionsGuideService {
  constructor(private httpClient: HttpClient) {}
}
