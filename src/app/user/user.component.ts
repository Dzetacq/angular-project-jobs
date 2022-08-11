import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../company/company';
import { CompanyService } from '../company/company.service';
import { AuthService } from './auth/auth.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() user: User = {id: "", userName: "", email: "", isAdmin: false, isSuper: false, companies: []}
  subs: Subscription[] = [];
  shows: (String[])[] = [];
  constructor(public auth: AuthService, public comp: CompanyService) { }

  ngOnInit(): void {
    this.user = this.user.id.length == 0 ? this.auth.getUser() ?? this.user : this.user;
    if (this.auth.isLoggedIn()) {
      this.subs.push(this.comp.getCompaniesByUser(this.auth.getUser()!.id).subscribe(r => this.user.companies = r));
      this.shows = [
        ["Username", this.user.userName],
        ["First name", this.user.firstname ?? ""],
        ["Last name", this.user.lastname ?? ""],
        ["Email", this.user.email ?? ""],
        ["Phone number", this.user.phoneNumber ?? ""],
        ["Address", this.user.address ?? ""],
        ["LinkedIn", this.user.linkedIn ?? ""]
      ]
    }
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }

}
