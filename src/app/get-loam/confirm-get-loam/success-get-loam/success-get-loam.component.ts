import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GetLoamService } from "../../get-loam.service";
import { AuthService } from "src/app/auth/auth.service";
import { UserBuyLoanInfoModel } from "src/app/shared/models/UserInformation.model";
import { UtilityFunctionsService } from "src/app/shared/services/utility-functions.service";

@Component({
  selector: "app-success-get-loam",
  templateUrl: "./success-get-loam.component.html",
  styleUrls: ["./success-get-loam.component.scss"],
})
export class SuccessGetLoamComponent implements OnInit {
  trackingCode: string;
  userId: string;
  second: number;
  loader: boolean;
  buyLoanInfo: UserBuyLoanInfoModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getLoanService: GetLoamService,
    private authService: AuthService,
    public utilityFunctions: UtilityFunctionsService
  ) {
    this.buyLoanInfo = new UserBuyLoanInfoModel();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.second = 20;
    this.loader = true;
    this.trackingCode = this.route.snapshot.params.trackingCode;
    this.userId = this.authService.getUserAccount().UserId;

    this.getLoanService
      .getFactorForBuyLoan(this.trackingCode)
      .subscribe((resultInfo) => {
        if (resultInfo) {
          this.buyLoanInfo = resultInfo;
          setInterval(() => {
            if (this.second > 0) {
              this.second--;
            } else {
              this.router.navigateByUrl("/home");
              return;
            }
          }, 1000);
        } else {
          this.buyLoanInfo = null;
          return;
        }
        this.loader = false;
      });
  }
}
