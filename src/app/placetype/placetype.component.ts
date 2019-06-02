import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PlaceTypeService } from "./placetype.service";
import { PlaceType } from "./placetype";
import { DialogComponent } from "../dialog/dialog.component";

declare global {
  interface Window {
    qq: any;
  }
}

@Component({
  selector: "app-placetype",
  templateUrl: "./placetype.component.html",
  styleUrls: ["./placetype.component.sass"]
})
export class PlaceTypeComponent implements OnInit {
  constructor(
    private placetypeService: PlaceTypeService,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = ["Id", "Type", "edit"];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPlaceTypes() {
    this.placetypeService
      .getPlaceTypes()
      .subscribe(
        placetypes => (this.dataSource = new MatTableDataSource(placetypes))
      );
  }

  openDialog(data: PlaceType): void {
    const dialogRef = this.dialog.open(PlaceTypeDialogComponent, {
      width: "450px",
      data: JSON.parse(JSON.stringify(data))
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPlaceTypes();
      }
    });
  }

  addPlaceTypes() {
    const dialogRef = this.dialog.open(PlaceTypeDialogComponent, {
      width: "450px",
      data: new PlaceType()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPlaceTypes();
      }
    });
  }

  ngOnInit() {
    this.getPlaceTypes();
  }
}

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
  ) {
    if (!data.Id) {
      this.data = new PlaceType();
    }
  }

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
