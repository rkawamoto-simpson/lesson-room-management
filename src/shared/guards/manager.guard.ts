import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { RestfulService } from "src/services/restful.service";

@Injectable({
    providedIn: "root",
})
export class ManagerGuard implements CanActivate {
    constructor(
        private restFulService: RestfulService,
        public router: Router
    ) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const api_token = this.restFulService.getStorage("api_token");
        if (api_token && api_token !== "") {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}
