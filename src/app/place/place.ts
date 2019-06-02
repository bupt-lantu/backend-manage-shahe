import { PlaceType } from "../placetype/placetype";
export class Place {
  Id: number;
  Title: string;
  Desc: string;
  Picture: string;
  Video: string;
  Longitude: number;
  Latitude: number;
  PlaceType: PlaceType;
}
