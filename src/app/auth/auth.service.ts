import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { scan, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import * as qs from "querystring";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  isLoggedIn = true;
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.baseURL}\login`,
        qs.stringify({
          username,
          password
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          withCredentials: true
        }
      )
      .pipe(
        scan(() => {
          this.isLoggedIn = true;
          return true;
        }),
        catchError(() => {
          this.isLoggedIn = false;
          return of(false);
        })
      );
  }

  checkLogin(): Observable<boolean> {
    return this.http
      .get(`${environment.baseURL}\login`, {
        withCredentials: true
      })
      .pipe(
        scan((login: any) => {
          if (login.data === "ok") {
            return true;
          } else {
            return false;
          }
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
