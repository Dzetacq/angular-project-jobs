import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../../global';
import { EditCompany } from './edit-company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url: string = api + "companies/";
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url);
  }

  getCompanyById(id: number) : Observable<Company> {
    return this.http.get<Company>(this.url + id);
  }
  
  getCompaniesByUser(id: string) : Observable<Company[]> {
    return this.http.get<Company[]>(this.url + "user/" + id);
  }

  putCompany(id: number, company: EditCompany) : Observable<Company> {
    return this.http.put<Company>(this.url + id, company)
  }
}
