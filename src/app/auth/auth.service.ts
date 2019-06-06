import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
    const vaild = username == "super" && password == "super";
    return of(vaild).pipe(
      delay(1000),
      tap(val => (this.isLoggedIn = val))
    );
  }

  logout() {
    this.isLoggedIn = false;
  }

  constructor() {}
}
