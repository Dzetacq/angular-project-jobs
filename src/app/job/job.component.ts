import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/auth/auth.service';
import { User } from '../user/user';
import { Application } from './application/application';
import { Job } from './job';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy, OnChanges {
  @Input() job: Job = {id: 0, name: "", description: "", sectorId: 0};
  @Input() isDetail: boolean = false;
  canApply: boolean = false;
  deadline: Date | null = null;
  today: Date = new Date(new Date().toDateString());
  user: User = {id: "", userName: "", isAdmin: false, isSuper: false, companies: []}
  error: string = "";
  subs: Subscription[] = [];
  constructor(private router: Router, private location: Location, 
    private jobService: JobService, private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser() ?? this.user;
    if (this.job.deadline) {
      this.deadline = new Date(this.job.deadline);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  ngOnChanges(): void {
    this.canApply = !this.auth.isLoggedIn() || this.job.applications ? !this.job.applications?.map(a => a.userId).includes(this.user.id) : true
    if (this.job.deadline) {
      this.deadline = new Date(this.job.deadline);
    }
  }

  edit(id: number) {
    this.router.navigate(['/admin/job/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.subs.push(this.jobService.deleteJob(id).subscribe({
      next: () => this.router.navigate(['/company/' + this.job.companyId]),
      error: e => this.error = e.message
    }));
  }

  yourApplication(): Application[] {
    let applications: Application[] = [];
    let application = this.job.applications?.find(a => a.userId == this.user.id)
    if (application) {
      applications.push(application);
    }
    return applications;
  }

  applyJob() {
    this.router.navigate(['/job/application/form'], {state: {userId: this.user.id, jobId: this.job.id, mode: 'add'}});
  }

}
