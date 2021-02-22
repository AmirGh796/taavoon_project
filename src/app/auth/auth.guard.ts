import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.getToken() && this.authService.getToken().length) {
      return true;
    } else {
      return this.router.navigateByUrl("/error-user");
    }
  }
}

// import { Injectable } from "@angular/core";
// import {
//   CanActivate,
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from "@angular/router";
// import { AuthService } from "./auth.service";

// @Injectable()
// export class AuthGuardService implements CanActivate {
//   constructor(private router: Router, public auth: AuthService) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     var token = this.auth.getToken();
//     if (token && token != "") {
//       console.log(this.auth.getToken());
//       return true;
//     } else {
//       alert(2);
//       this.router.navigate(["/login"], {
//         // queryParams: {
//         //   return: state.url
//         // }
//       });
//       return false;
//     }
//   }
// }
