import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Place } from "./place";
import { HttpClient } from "@angular/common/http";

const baseURI = "http://139.199.26.178:8000/v1/";

@Injectable({
  providedIn: "root"
})
export class PlaceService {
  constructor(private http: HttpClient) {}
  getPlaces(): Observable<Place[]> {
    return this.http
      .get<Place[]>(`${baseURI}/place`)
      .pipe(catchError(this.handleError<Place[]>("getPlaces", [])));
  }

  editPlaces(place: Place): Observable<void> {
    return this.http
      .put<void>(`${baseURI}/place/${place.Id}`, place)
      .pipe(catchError(this.handleError<void>("editPlaces")));
  }

  addPlaces(place: Place): Observable<void> {
    return this.http
      .post<void>(`${baseURI}/place`, place)
      .pipe(catchError(this.handleError<void>("addPlaces")));
  }

  deletePlaces(place: Place): Observable<void> {
    return this.http
      .delete<void>(`${baseURI}/place/${place.Id}`)
      .pipe(catchError(this.handleError<void>("deletePlaces")));
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
