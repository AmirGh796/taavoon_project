import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuestionsGuideComponent } from "./questions-guide.component";
import { AnswersComponent } from "./answers/answers.component";

const routes: Routes = [
  {
    path: "",
    component: QuestionsGuideComponent,
  },
  {
    path: "answers/:itemId",
    component: AnswersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsGuideRoutingModule {}
