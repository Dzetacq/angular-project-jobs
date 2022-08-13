import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit, OnDestroy {
  application: Application = {userId: "", jobId: 0};
  fromJob: boolean = false;
  subs: Subscription[] = [];

  constructor(private service: ApplicationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getApplication();
    this.subs.push(this.router.events.subscribe((v) => {
      this.getApplication();
    }));
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  
  getApplication(): void {
    const userId = this.route.snapshot.paramMap.get('userId') ?? "";
    const jobId = +(this.route.snapshot.paramMap.get('jobId') ?? 0);
    this.fromJob = this.route.snapshot.paramMap.get('fromJob') == "true";
    this.subs.push(this.service.getApplication(userId, jobId).subscribe(r => this.application = r))
  }

}
