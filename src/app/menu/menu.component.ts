import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Company } from '../company/company';
import { CompanyService } from '../company/company.service';
import { AuthService } from '../user/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  links = [
    { title: "Home", url: "/" },
    { title: "Job overview", url: "/job/overview" }
  ];
  hide: boolean = true;
  companies: Company[] = [];
  subs: Subscription[] = [];
  constructor(public route: ActivatedRoute, public auth: AuthService, public comp: CompanyService) { }

  ngOnInit(): void {
    if (this.auth.getUser() != null) {
      this.subs.push(this.comp.getCompaniesByUser(this.auth.getUser()!.id).subscribe(r => this.companies = r));
    }
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
