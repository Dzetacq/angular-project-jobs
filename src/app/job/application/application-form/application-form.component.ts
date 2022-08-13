import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Job } from '../../job';
import { JobService } from '../../job.service';
import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnDestroy {
  appl: Application = {userId: "", jobId: 0}
  job: Job = {id: 0, name: "", sectorId: 0}
  error: string = '';
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  subs: Subscription[] = [];

  constructor(private service: ApplicationService, private router: Router, private jobService: JobService) { 
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.appl.userId = this.router.getCurrentNavigation()?.extras.state?.['userId'];
    this.appl.jobId = +this.router.getCurrentNavigation()?.extras.state?.['jobId'];
    if (this.isEdit) {
      this.subs.push(this.service.getApplication(this.appl.userId, this.appl.jobId)
        .subscribe(r => this.appl = r));
    }
    
  }

  ngOnInit(): void {
    console.log(this.appl)
    if (this.appl.jobId) {
      this.subs.push(this.jobService.getJobById(this.appl.jobId).subscribe(r => this.job = r));
    }
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    this.isSubmitted = true;
    let observable = new Observable<Application>();
    console.log(this.appl);
    if (this.isAdd) {
      observable = this.service.postApplication(this.appl);
    }
    if (this.isEdit) {
      observable = this.service.putApplication(this.appl.userId, this.appl.jobId, this.appl)
    }
    this.subs.push(observable.subscribe({
        next: r => this.router.navigateByUrl("/job/application/" + this.appl.userId + "/" + this.appl.jobId + "/false"),
        error: e => this.error = e.message
    }));
  }

}
