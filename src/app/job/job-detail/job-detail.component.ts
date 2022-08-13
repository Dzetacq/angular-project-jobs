import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from '../company/company';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit, OnDestroy {
  job: Job = {id: 0, name: "", description: "", sectorId: 0};
  company: Company | undefined = undefined;
  subs: Subscription[] = [];

  constructor( private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs.push(this.jobService.getJobById(
        +(this.route.snapshot.paramMap.get('id') ?? 0)
      ).subscribe(r => {this.job = r; this.company = r.company}))
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
