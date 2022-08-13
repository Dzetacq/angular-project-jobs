import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../global';
import { Application } from './application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  url: string = api + "Applications/";

  constructor(private http: HttpClient) { }

  getApplicationsByJob(id: number): Observable<Application[]> {
    return this.http.get<Application[]>(this.url + "job/" + id)
  }

  getApplicationsByUser(id: string): Observable<Application[]> {
    return this.http.get<Application[]>(this.url + "user/" + id)
  }

  getApplication(userId: string, jobId: number): Observable<Application> {
    return this.http.get<Application>(this.url + userId + "/" + jobId);
  }

  postApplication(appl: Application): Observable<Application> {
    return this.http.post<Application>(this.url, appl);
  }

  putApplication(userId: string, jobId: number, appl: Application) : Observable<Application> {
    return this.http.put<Application>(this.url + userId + "/" + jobId, appl);
  }

  deleteApplication(userId: string, jobId: number): Observable<Application> {
    return this.http.delete<Application>(this.url + userId + "/" + jobId);
  }
}