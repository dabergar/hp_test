import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private readonly _http: HttpClient) {}

  public getData(id?: number): Observable<object> {
    let url = "http://localhost:8000/albums";
    if (id) {
      url += `?userId=${id}`;
    }
    return this._http.get(url);
  }
}
