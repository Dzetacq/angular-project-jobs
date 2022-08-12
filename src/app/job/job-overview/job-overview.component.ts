import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth/auth.service';
import { User } from 'src/app/user/user';
import { Company } from '../company/company';
import { CompanyService } from '../company/company.service';
import { Job } from '../job'
import { JobService } from '../job.service'

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrls: ['./job-overview.component.scss']
})
export class JobOverviewComponent implements OnInit, OnDestroy, OnChanges {
  @Input() companyId: number = 0;
  @Input() isSeparate: boolean = true;
  company: Company = {id: 0, name: "", adminId: "", jobCount: 0, jobs: []}
  user: User = {id: "", userName: "", companies: [], isAdmin: false, isSuper: false}
  jobs: Job[] = [];
  subs: Subscription[] = [];
  constructor(private jobService: JobService, private router: Router, 
    private auth: AuthService, private companyService: CompanyService) {
    
   }

  ngOnInit(): void {
    this.getJobs();
    this.user = this.auth.getUser() ?? this.user;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getJobs();
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }

  add() {
    this.router.navigate(['admin/job/form'], {state: {companyId: this.companyId, mode: 'add'}});
  }

  getJobs() {
    if (this.companyId == 0) {
      this.subs.push(this.jobService.getJobs()
            .subscribe(r => this.jobs = this.companyId == 0 ? r : this.jobs))
    } else {
      this.subs.push(this.companyService.getCompanyById(this.companyId)
            .subscribe(r => this.company = r))
      this.subs.push(this.jobService.getJobsByCompany(this.companyId)
            .subscribe(r => this.jobs = r))
    }
  }
}
