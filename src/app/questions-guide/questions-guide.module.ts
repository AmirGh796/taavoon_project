import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { QuestionsGuideComponent } from "./questions-guide.component";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { QuestionsGuideService } from "./questions-guide.service";
import { QuestionsGuideRoutingModule } from "./questions-guide.routing";
import { AnswersComponent } from "./answers/answers.component";

@NgModule({
  declarations: [QuestionsGuideComponent, AnswersComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestionsGuideRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  providers: [QuestionsGuideService],
})
export class QuestionsGuideModule {}
