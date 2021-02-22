import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { HttpServices } from "./shared/services/HttpServices.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  showNotifications: boolean;
  logedInAccount: any;

  constructor(
    private authService: AuthService,
    public httpService: HttpServices
  ) {}

  ngAfterViewInit(): void {
    this.httpService
      .saveUsersClickedOrView({
        forUserId: this.logedInAccount?.UserId,
        forSection: 0,
      })
      .subscribe((_) => {});
  }

  ngOnInit(): void {
    this.initData();
  }

  // resetStorage(): void {
  //   localStorage.removeItem("BFPayment_RTC");
  //   localStorage.removeItem("BFPayment_Id");
  // }

  initData(): void {
    //this.resetStorage();
    if (this.authService.getToken() && this.authService.getToken().length) {
      this.authService.setIsCreateToken = true;
      this.showNotifications = true;
      this.logedInAccount = this.authService.getUserAccount();
    } else {
      this.showNotifications = false;
    }
  }
}
