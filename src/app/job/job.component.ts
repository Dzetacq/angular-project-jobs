import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { AuthService } from '../user/auth/auth.service';
import { User } from '../user/user';
import { Job } from './job';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {
  @Input() job: Job = {id: 0, name: "", description: "", sectorId: 0};
  @Input() isDetail: boolean = false;
  user: User = {id: "", userName: "", isAdmin: false, isSuper: false, companies: []}
  error: string = "";
  subs: Subscription[] = [];
  constructor(private router: Router, private location: Location, 
    private jobService: JobService, private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser() ?? this.user;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  edit(id: number) {
    this.router.navigate(['admin/job/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.subs.push(this.jobService.deleteJob(id).subscribe({
      next: () => this.location.back(),
      error: e => this.error = e.message
    }));
  }

  applyJob(id: number) {
    this.router.navigate(['job/'], {state: {id: id, mode: 'edit'}});
  }

}
