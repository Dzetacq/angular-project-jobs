import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
  company: Company = {id: 0, name: "", adminId: "", jobCount: 0, jobs: []};
  subs: Subscription[] = [];

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCompany();
    this.subs.push(this.router.events.subscribe((v) => {
      this.getCompany();
    }));
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  getCompany(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.subs.push(this.companyService.getCompanyById(id).subscribe(r => this.company = r))
  }

}
