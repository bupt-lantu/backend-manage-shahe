import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { PlaceService } from "../../place.service";
import { Place } from "../place";
import { PlaceDialogComponent } from "../dialog/place.dialog";
import {environment} from '../../../environments/environment'

declare global {
  interface Window {
    qq: any;
  }
}

@Component({
  selector: "app-main",
  templateUrl: "./place.component.html",
  styleUrls: ["./place.component.sass"]
})
export class PlaceComponent implements OnInit {
  readonly fileURL = environment.fileURL
  displayedColumns: string[] = [
    "Id",
    "Title",
    "Desc",
    "Picture",
    "Video",
    "Longitude",
    "Latitude",
    "PlaceType",
    "edit"
  ];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPlaces() {
    this.placeService
      .getPlaces()
      .subscribe(places => (this.dataSource = new MatTableDataSource(places)));
  }

  openDialog(data: Place): void {
    const dialogRef = this.dialog.open(PlaceDialogComponent, {
      width: "450px",
      data: JSON.parse(JSON.stringify(data))
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPlaces();
      }
    });
  }

  addPlaces() {
    const dialogRef = this.dialog.open(PlaceDialogComponent, {
      width: "450px",
      data: {} as Place
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPlaces();
      }
    });
  }

  constructor(private placeService: PlaceService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getPlaces();
  }
}
