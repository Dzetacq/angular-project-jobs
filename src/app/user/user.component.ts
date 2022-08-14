import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../job/application/application.service';
import { CompanyService } from '../job/company/company.service';
import { AuthService } from './auth/auth.service';
import { EditPassword } from './editPassword';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy, OnChanges {
  @Input() user: User = {id: "", userName: "", email: "", isAdmin: false, isSuper: false, companies: []}
  error: string = "";
  userId: string = "";
  pwModel: EditPassword = {newPassword: ""};
  subs: Subscription[] = [];
  shows: String[][] = [];
  isSubmitted: boolean = false;
  constructor(public auth: AuthService, public comp: CompanyService, public appl: ApplicationService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? "";
    this.user = this.user.id.length == 0 ? this.auth.getUser() ?? this.user : this.user;
    if (this.userId != "") {
      this.subs.push(this.auth.getUserById(this.userId).subscribe(r => {this.user = r; this.ngOnChanges()}));
    }
    this.subs.push(this.comp.getCompaniesByUser(this.userId != "" ? this.userId : this.user.id)
        .subscribe(r => this.user.companies = r));
    this.subs.push(this.appl.getApplicationsByUser(this.userId != "" ? this.userId : this.user.id)
        .subscribe(r => this.user.applications = r))
    this.getData();
  }

  ngOnChanges(): void {
    this.getData();
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }

  getData(): void {
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

  onSubmit(): void {
    this.isSubmitted = true;
    this.subs.push(this.auth.changePassword(this.user.id, this.pwModel).subscribe({
      next: () => window.location.reload(),
      error: e => {this.error = e.error.message; this.isSubmitted = false;}
    } ));
  }

}
