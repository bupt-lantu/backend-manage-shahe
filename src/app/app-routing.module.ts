import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "place",
    loadChildren: () => import("./place/place.module").then(m => m.PlaceModule)
  },
  {
    path: "typeplace",
    loadChildren: () =>
      import("./placetype/placetype.module").then(m => m.PlaceTypeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
