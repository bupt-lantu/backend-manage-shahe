import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}
  ngOnInit() {}
  username: string;
  password: string;

  login() {
    this.authService.login(this.username, this.password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl
          ? this.router.parseUrl(this.authService.redirectUrl)
          : "/place";
        this.router.navigateByUrl(redirect);
      }
    });
  };
}
