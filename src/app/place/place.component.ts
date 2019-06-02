import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PlaceService } from "./place.service";
import { PlaceTypeService } from "../placetype/placetype.service";
import { PlaceType } from "../placetype/placetype";
import { Place } from "./place";
import { DialogComponent } from "../dialog/dialog.component";

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
      data: new Place()
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

@Component({
  selector: "app-place-dialog",
  templateUrl: "place.dialog.html",
  styleUrls: ["./place.dialog.sass"]
})
export class PlaceDialogComponent implements AfterViewInit {
  constructor(
    private placeService: PlaceService,
    private placetypeService: PlaceTypeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Place
  ) {
    if (!data.Id) {
      this.data = new Place();
      this.data.Latitude = 40.157738;
      this.data.Longitude = 116.28788;
    }
  }

  marker: any;
  info: any;
  map: any;

  placeTypes: PlaceType[] = [];
  ngAfterViewInit() {
    const that = this;
    this.placetypeService.getPlaceTypes().subscribe(result => {
      this.placeTypes = result;
      console.log(this.placeTypes);
    });
    this.map = new window.qq.maps.Map(document.getElementById("container"), {
      // 地图的中心地理坐标。
      center: new window.qq.maps.LatLng(
        this.data.Latitude,
        this.data.Longitude
      ),
      zoom: 17
    });
    this.showPosition();
    window.qq.maps.event.addListener(this.map, "click", event => {
      that.data.Longitude = event.latLng.getLng();
      that.data.Latitude = event.latLng.getLat();
      that.showPosition();
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false); //返回是否刷新
  }

  onEditClick(place: Place): void {
    this.placeService.editPlaces(place).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onDeleteClick(place: Place): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "450px",
      role: "alertdialog"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.placeService.deletePlaces(place).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        this.dialogRef.close(true);
      }
    });
  }

  onAddClick(place: Place): void {
    this.placeService.addPlaces(place).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  changePosition(Latitude: number, Longitude: number) {
    this.data.Latitude = Latitude;
    this.data.Longitude = Longitude;
    this.showPosition();
  }

  showPosition() {
    const that = this;
    const center = new window.qq.maps.LatLng(
      this.data.Latitude,
      this.data.Longitude
    );
    if (this.marker) {
      this.marker.setMap(null);
    }
    if (this.info) {
      this.info.setMap(null);
    }
    this.marker = new window.qq.maps.Marker({
      position: center,
      map: this.map
    });
    this.info = new window.qq.maps.InfoWindow({
      map: this.map
    });
    window.qq.maps.event.addListener(this.marker, "click", () => {
      that.info.open();
      that.info.setContent(`<div style="text-align:center;white-space:nowrap;'+
                           'margin:10px;">${that.data.Title}</div>`);
      that.info.setPosition(center);
    });
  }
}
