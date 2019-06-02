import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DialogModule } from "../dialog/dialog.module";
import { PlaceComponent, PlaceDialogComponent } from "./place.component";

@NgModule({
  declarations: [PlaceComponent, PlaceDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: PlaceComponent
      }
    ]),

    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DialogModule
  ],
  exports: [RouterModule],
  entryComponents: [PlaceDialogComponent]
})
export class PlaceModule {}
