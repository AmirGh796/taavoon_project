import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  countOfMessages: number;
  countOfProducts: number;
  newMsgsInterval: any;
  logedInAccount: any;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      let icons = document.querySelectorAll(".notif-item i");
      for (let index = 0; index < icons.length; index++) {
        (icons[index] as HTMLElement).style.margin = "0px";
      }
    }, 500);
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.countOfMessages = 0;
    this.countOfProducts = 0;
    this.logedInAccount = this.authService.getUserAccount();

    if (this.newMsgsInterval) clearInterval(this.newMsgsInterval);

    if (
      this.logedInAccount &&
      this.authService.getToken() &&
      this.authService.getToken().length
    ) {
      this.checkHasNewNotif();
    }
  }

  checkHasNewNotif(): void {
    this.newMsgsInterval = setInterval(() => {
      this.authService
        .countHasNewMessage(this.logedInAccount.UserId)
        .subscribe((res) => {
          this.countOfMessages = res;
        });
    }, 2000);
  }

  goToMessages(): void {
    window.location.href = environment.userPanel + "/my-messages";
  }

  openShoppingBasket(): void {}
}
