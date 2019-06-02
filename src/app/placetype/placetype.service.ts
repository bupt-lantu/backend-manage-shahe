import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PlaceType } from "./placetype";
import { HttpClient } from "@angular/common/http";

const baseURI = "http://139.199.26.178:8000/v1/";

@Injectable({
  providedIn: "root"
})
export class PlaceTypeService {
  constructor(private http: HttpClient) {}
  getPlaceTypes(): Observable<PlaceType[]> {
    return this.http
      .get<PlaceType[]>(`${baseURI}/placetype`)
      .pipe(catchError(this.handleError<PlaceType[]>("getPlaceTypes", [])));
  }

  editPlaceTypes(placetype: PlaceType): Observable<void> {
    return this.http
      .put<void>(`${baseURI}/placetype/${placetype.Id}`, placetype)
      .pipe(catchError(this.handleError<void>("editPlaceTypes")));
  }

  addPlaceTypes(placetype: PlaceType): Observable<void> {
    return this.http
      .post<void>(`${baseURI}/placetype`, placetype)
      .pipe(catchError(this.handleError<void>("addPlaceTypes")));
  }

  deletePlaceTypes(placetype: PlaceType): Observable<void> {
    return this.http
      .delete<void>(`${baseURI}/placetype/${placetype.Id}`)
      .pipe(catchError(this.handleError<void>("deletePlaceTypes")));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
