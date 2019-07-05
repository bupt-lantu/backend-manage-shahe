import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { PlaceTypeService } from "../../placetype.service";
import { PlaceType } from "../placetype";
import { PlaceTypeDialogComponent } from "../dialog/placetype.dialog";

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
      data: {} as PlaceType
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
