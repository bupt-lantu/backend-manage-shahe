import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  {
    path: "place",
    loadChildren: () => import("./place/place.module").then(m => m.PlaceModule),
    canActivate: [AuthGuard]
  },
  {
    path: "typeplace",
    loadChildren: () =>
      import("./placetype/placetype.module").then(m => m.PlaceTypeModule),
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  {
    path: "**",
    loadChildren: () => import("./place/place.module").then(m => m.PlaceModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
