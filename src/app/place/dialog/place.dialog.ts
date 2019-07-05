import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { PlaceTypeService } from "../../placetype.service";
import { PlaceType } from "../../placetype/placetype";
import { DialogComponent } from "../../dialog/dialog.component";
import { FileService } from "../../file.service";
import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileValidator } from "ngx-material-file-input";
import { PlaceService } from "../../place.service";
import { Place } from "../place";

@Component({
  selector: "app-place-dialog",
  templateUrl: "place.dialog.html",
  styleUrls: ["./place.dialog.sass"]
})
export class PlaceDialogComponent implements AfterViewInit, OnInit {
  constructor(
    private placeService: PlaceService,
    private fileService: FileService,
    private placetypeService: PlaceTypeService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Place
  ) {
    if (!data.Id) {
      this.data.Latitude = 40.157738;
      this.data.Longitude = 116.28788;
      this.data.PlaceType = {} as PlaceType;
      console.log(this.data);
    }
  }

  marker: any;
  info: any;
  map: any;

  ngOnInit() {
    this.placetypeService.getPlaceTypes().subscribe(result => {
      this.placeTypes = result;
    });
    this.formDoc = this.fb.group({
      Picture: [undefined, [FileValidator.maxContentSize(20971520)]],
      Video: [undefined, [FileValidator.maxContentSize(20971520)]]
    });
  }

  formDoc: FormGroup;
  placeTypes: PlaceType[] = [];
  ngAfterViewInit() {
    const that = this;
    this.map = new window.qq.maps.Map(document.getElementById("container"), {
      // 地图的中心地理坐标。
      center: new window.qq.maps.LatLng(
        this.data.Latitude,
        this.data.Longitude
      ),
      zoom: 17
    });
    this.showPosition();
    window.qq.maps.event.addListener(this.map, "click", (event: any) => {
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

  async onAddClick(place: Place) {
    if(this.formDoc.value.Picture){
      await this.fileService.upload(this.formDoc.value.Picture.files[0])
      place.Picture = this.formDoc.value.Picture.files[0].name;
    }
    if(this.formDoc.value.Video){
      await this.fileService.upload(this.formDoc.value.Video.files[0])
      place.Video = this.formDoc.value.Video.files[0].name;
    }
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
