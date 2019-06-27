import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  title = "backend-management";
  constructor(){
    this.loadScript()
  }
  loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://map.qq.com/api/js?v=2.exp&key=EFZBZ-AEGK3-XJQ3Y-3Q6XJ-AEKLJ-YCFXS&callback=init";
    document.body.appendChild(script);
  }
}
