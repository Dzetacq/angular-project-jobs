import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth/auth.service';
import { User } from 'src/app/user/user';
import { Company } from './company';
import { CompanyService } from './company.service';
import { EditCompany } from './edit-company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
  @Input() company: Company = {id: 0, name: "", adminId: "", jobCount: 0, jobs: []};
  @Input() isDetail: boolean = false;
  user: User = {id: "", userName: "", isAdmin: false, isSuper: false, companies: []};
  users: User[] = [];
  subs: Subscription[] = [];
  isSubmitted: boolean = false;
  editCompany: EditCompany = {id: 0}
  constructor(private auth: AuthService, private companyService: CompanyService, 
    private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.user = this.auth.getUser() ?? this.user;
    this.auth.getUsers().subscribe(r => this.users = r);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.editCompany = {
      id: this.company.id, 
      name: this.company.name != null && this.company.name.length > 0 ? this.company.name : undefined,
      adminId: this.company.adminId, 
      description: this.company.description,
      phoneNumber: this.company.phoneNumber,
      address: this.company.address,
      mailAddress: this.company.mailAddress
    }
    this.subs.push(this.companyService.putCompany(this.company.id, this.editCompany).subscribe(r => {
      document.getElementById("adminEdit")?.click();
      this.company = r
      this.isSubmitted = false;
      //window.location.reload();
    }));
  }

  delete(id: number) {
    this.subs.push(this.companyService.deleteCompany(id).subscribe(
      () => this.router.navigate(['/super'])
    ));
  }
}
