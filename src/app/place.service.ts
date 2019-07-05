import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Place } from "./place/place";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PlaceService {
  constructor(private http: HttpClient) {}
  getPlaces(): Observable<Place[]> {
    return this.http
      .get<Place[]>(`${environment.baseURL}/place`)
      .pipe(catchError(this.handleError<Place[]>([])));
  }

  editPlaces(place: Place): Observable<void> {
    return this.http
      .put<void>(`${environment.baseURL}/place/${place.Id}`, place, {
        withCredentials: true
      })
      .pipe(catchError(this.handleError<void>()));
  }

  addPlaces(place: Place): Observable<void> {
    return this.http
      .post<void>(`${environment.baseURL}/place`, place, {
        withCredentials: true
      })
      .pipe(catchError(this.handleError<void>()));
  }

  deletePlaces(place: Place): Observable<void> {
    return this.http
      .delete<void>(`${environment.baseURL}/place/${place.Id}`, {
        withCredentials: true
      })
      .pipe(catchError(this.handleError<void>()));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (): Observable<T> => {
      return of(result as T);
    };
  }
}
