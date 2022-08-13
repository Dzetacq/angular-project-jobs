import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth/auth.service';
import { User } from 'src/app/user/user';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { EditCompany } from '../edit-company';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit, OnDestroy {
  company: EditCompany = { id: 0, name: "", adminId: "" }
  users: User[] = [];
  isSubmitted: boolean = false;
  error: string = '';
  subs: Subscription[] = [];

  constructor(private service: CompanyService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUsers().subscribe(r => this.users = r);
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.company);
    this.subs.push(this.service.postCompany(this.company).subscribe({
      next: r => this.router.navigateByUrl('/company/' + r.id),
      error: e => this.error = e.message
    }))
  }

}
