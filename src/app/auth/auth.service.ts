import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { scan, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import qs from "querystring";

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

  checkLogin(): Observable<Object> {
    return this.http.get(`${environment.baseURL}\login`, {
      withCredentials: true
    });
  }

  logout() {
    this.isLoggedIn = false;
  }
}
