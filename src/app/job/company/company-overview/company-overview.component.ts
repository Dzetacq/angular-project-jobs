import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {
  companies$: Observable<Company[]> = new Observable<Company[]>();
  @Input() isSeparate: boolean = true;

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.companies$ = this.companyService.getCompanies();
  }

  add() {
    this.router.navigate(['super/company/form']);
  }

}
