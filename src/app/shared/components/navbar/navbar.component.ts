import { Component, OnInit, AfterViewInit, HostListener } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { GetNavigationBarModel } from "../../models/ContentObjects.model";
import { HttpServices } from "../../services/HttpServices.service";
import { BrandOfNSCModel, ItemsOfNSCModel } from "../../models/MainSite.model";
import { NgwWowService } from "ngx-wow";
import { UtilityFunctionsService } from "../../services/utility-functions.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean;
  navBarElement: HTMLElement;
  sideNavElement: HTMLElement;
  sidenavMaskElement: HTMLElement;
  logoutLoader: boolean;
  navigationBar: GetNavigationBarModel;

  constructor(
    public authService: AuthService,
    private httpService: HttpServices,
    private wowService: NgwWowService,
    public utilityFunctions: UtilityFunctionsService
  ) {
    this.wowService.init();
    this.navigationBar = new GetNavigationBarModel();
    this.navigationBar.brand = new BrandOfNSCModel();
    this.navigationBar.items = new Array<ItemsOfNSCModel>();
  }

  @HostListener("window:scroll")
  onScrollEvent() {
    if (this.utilityFunctions.onWindowResize() !== 'sm') {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        this.navBarElement.style.backgroundColor = "rgb(156, 39, 176)";
        this.navBarElement.style.height = "100px";
      } else {
        this.navBarElement.style.backgroundColor = "rgba(156, 39, 176, 0.8)";
        this.navBarElement.style.height = "140px";
      }
    }
  }

  ngAfterViewInit(): void {
    this.navBarElement = document.getElementById("navigationBar");
    this.sideNavElement = document.getElementById("sideNavbar");
    this.sidenavMaskElement = document.getElementById("sideNavMask");
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.logoutLoader = false;
    this.httpService.getAllItemsForNavigation().subscribe((res) => {
      this.navigationBar = res;
      if (this.navigationBar.items && this.navigationBar.items.length) {
        this.navigationBar.brand = this.navigationBar.items.find(
          (f) => f.itemType === 2
        );
      }
      this.httpService.setLoadNavbarData = true;
    });
  }

  logout(): void {
    this.logoutLoader = true;
    this.authService
      .logOut(this.authService.getUserAccount().UserId)
      .subscribe(() => {
        this.logoutLoader = false;
        window.location.href = environment.mainSite;
      });
  }

  goToUserPanel(): void {
    if (this.authService.getToken() && this.authService.getToken().length) {
      window.location.href = environment.userPanel + "/home";
    }
  }

  openSideBarMenu(): void {
    this.sidenavMaskElement.style.display = "block";
    setTimeout(() => {
      this.sidenavMaskElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      this.sideNavElement.style.transform = "translateX(-238px)";
    }, 350);
  }

  closeSideBarMenu(): void {
    this.sidenavMaskElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    setTimeout(() => {
      this.sidenavMaskElement.style.display = "none";
    }, 350);
    this.sideNavElement.style.transform = "translateX(240px)";
  }
}
