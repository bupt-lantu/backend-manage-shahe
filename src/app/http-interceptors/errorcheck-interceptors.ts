import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrCheckInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(`请求 ${err.url} 失败：`);
        console.error(err.message);
        if (err.status === 401) {
          this.authService.isLoggedIn = false;
          this.router.navigate(["/login"]);
          console.log("没有权限访问!");
          return throwError("没有权限访问!");
        } else {
          return throwError("请求失败");
        }
      })
    );
  }
}
