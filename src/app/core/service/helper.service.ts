import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  static VERIFY_PARAM: string[] = ["_t", "_id", "_n", "_r", "_en"];

  constructor() { }

  getParam(key: string): string | null {
    return window.localStorage.getItem(key)
  }

  saveParam(key: string, value: string) {
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, value)
  }

  delAllParam(lstParam: string[]) {
    lstParam.forEach(v => {
      window.localStorage.removeItem(v);
    })
  }
  delParam(key: string) {
    window.localStorage.removeItem(key);
  }
}
