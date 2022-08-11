import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../global';
import { Sector } from './sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  url: string = api + "sectors/";

  constructor(private http: HttpClient) { }

  getSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.url);
  }

  getSectorById(id: number) : Observable<Sector> {
    return this.http.get<Sector>(this.url + id);
  }

  postSector(sector: Sector): Observable<Sector> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Sector>(this.url, sector, {headers: headers});
  }

  putSector(id:number, sector: Sector): Observable<Sector> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Sector>(this.url + id, sector, {headers: headers});
  }

  deleteSector(id: number): Observable<Sector> {
    return this.http.delete<Sector>(this.url + id);
  }
}
