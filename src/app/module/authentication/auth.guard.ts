import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, ParamMap, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {HelperService} from "../../core/service/helper.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private helper: HelperService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger
    let paramCheck = this.extractParam(route.queryParamMap);
    return this.router.navigate(["/"]);
  }

  private extractParam(paramMap: ParamMap): boolean {
    let result = true;
    for (let i = 0; i < HelperService.VERIFY_PARAM.length; i++) {
      const p = paramMap.get(HelperService.VERIFY_PARAM[i]);
      if (p == null) {
        result = false;
        this.helper.delAllParam(HelperService.VERIFY_PARAM);
        break;
      }
    }
    if (result) {
      HelperService.VERIFY_PARAM.forEach(val => {
        const p = paramMap.get(val);
        if (p != null)
          this.helper.saveParam(val, p);
      })
    }
    return result;
  }

}
