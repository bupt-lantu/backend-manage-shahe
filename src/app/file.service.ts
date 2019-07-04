import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FileService {
  private auth: string = null;
  constructor(private http: HttpClient) {}
  private getAuth(): Observable<string> {
    return this.http.post<string>(
      `${environment.fileURL}file_admin/api/login`,
      null,
      {
        headers: {
          "Content-Type": "text/plain"
        },
        responseType: "text" as "json"
      }
    );
  }

  async upload(file: File): Promise<void> {
    if (!this.auth) {
      this.auth = await this.getAuth().toPromise();
    }
    await this.http
      .post<void>(
        `${environment.fileURL}file_admin/api/resources/${file.name}?override=true`,
        file.slice(),
        { headers: { "X-Auth": this.auth, "Content-Type": "text/html" } }
      )
      .toPromise();
  }
}
