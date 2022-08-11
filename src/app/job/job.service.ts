import { Injectable } from '@angular/core';
import { Job } from './job';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../global'

@Injectable({
  providedIn: 'root'
})
export class JobService {
  url: string = api + "jobs/";
  constructor(private http: HttpClient) {
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url);
  }

  getJobsByCompany(id: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + 'company/' + id);
  }

  getJobById(id: number) : Observable<Job> {
    return this.http.get<Job>(this.url + id);
  }

  postJob(job: Job) : Observable<Job> {
    return this.http.post<Job>(this.url, job);
  }

  putJob(id: number, job: Job) : Observable<Job> {
    return this.http.put<Job>(this.url + id, job);
  }

  deleteJob(id: number) : Observable<Job> {
    return this.http.delete<Job>(this.url + id);
  }
}
