import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PlaceType } from "./placetype/placetype";
import { HttpClient } from "@angular/common/http";

import { environment } from "./../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PlaceTypeService {
  constructor(private http: HttpClient) {}
  getPlaceTypes(): Observable<PlaceType[]> {
    return this.http
      .get<PlaceType[]>(`${environment.baseURL}/placetype`)
      .pipe(catchError(this.handleError<PlaceType[]>([])));
  }

  editPlaceTypes(placetype: PlaceType): Observable<void> {
    return this.http
      .put<void>(
        `${environment.baseURL}/placetype/${placetype.Id}`,
        placetype,
        { withCredentials: true }
      )
      .pipe(catchError(this.handleError<void>()));
  }

  addPlaceTypes(placetype: PlaceType): Observable<void> {
    return this.http
      .post<void>(`${environment.baseURL}/placetype`, placetype, {
        withCredentials: true
      })
      .pipe(catchError(this.handleError<void>()));
  }

  deletePlaceTypes(placetype: PlaceType): Observable<void> {
    return this.http
      .delete<void>(`${environment.baseURL}/placetype/${placetype.Id}`, {
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
