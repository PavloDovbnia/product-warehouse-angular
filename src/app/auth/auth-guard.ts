import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {TokenStorageService} from "./token-storage.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.tokenStorage.getToken()) {
      return true;
    }
    this.router.navigate(['auth/login']).then(() => {
    });
    return false;
  }

}
