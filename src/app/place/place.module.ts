import { CommonModule } from "@angular/common";
import { ReactiveFormsModule  } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import {MaterialFileInputModule} from "ngx-material-file-input"
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DialogModule } from "../dialog/dialog.module";
import { PlaceComponent } from "./main/place.component";
import {PlaceDialogComponent} from './dialog/place.dialog'

@NgModule({
  declarations: [PlaceComponent, PlaceDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MaterialFileInputModule,
    DialogModule
  ],
  exports: [RouterModule],
  entryComponents: [PlaceDialogComponent]
})
export class PlaceModule {}
