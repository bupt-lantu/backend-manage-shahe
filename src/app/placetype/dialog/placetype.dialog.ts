import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { DialogComponent } from "../../dialog/dialog.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { PlaceTypeService } from "../../placetype.service";
import { PlaceType } from "../placetype";

@Component({
  selector: "app-placetype-dialog",
  templateUrl: "placetype.dialog.html",
  styleUrls: ["./placetype.dialog.sass"]
})
export class PlaceTypeDialogComponent implements AfterViewInit {
  constructor(
    private placetypeService: PlaceTypeService,
    public dialogRef: MatDialogRef<PlaceTypeDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: PlaceType
  ) {}

  marker: any;
  info: any;
  map: any;

  ngAfterViewInit() {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEditClick(placetype: PlaceType): void {
    this.placetypeService.editPlaceTypes(placetype).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onDeleteClick(placetype: PlaceType): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "450px",
      role: "alertdialog"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.placetypeService.deletePlaceTypes(placetype).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        dialogRef.close();
      }
    });
  }

  onAddClick(placetype: PlaceType): void {
    this.placetypeService.addPlaceTypes(placetype).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
