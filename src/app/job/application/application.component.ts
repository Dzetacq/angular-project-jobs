import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth/auth.service';
import { User } from 'src/app/user/user';
import { Application } from './application';
import { ApplicationService } from './application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {
  @Input() application: Application = {userId: "", jobId: 0 }
  @Input() isDetail: boolean = false;
  @Input() fromUser: boolean = false;
  @Input() fromJob: boolean = false;
  error: string = "";
  user: User = {id: "", userName: "", isAdmin: false, isSuper: false, companies: []};
  subs: Subscription[] = [];

  constructor(private auth: AuthService, private router: Router, private service: ApplicationService, private location: Location) { }

  ngOnInit(): void {
    this.user = this.auth.getUser() ?? this.user;
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  edit(userId: string, jobId: number) {
    this.router.navigate(['application/form'], {state: {userId: userId, jobId: jobId, mode: 'edit'}});
  }

  delete(userId: string, jobId: number) {
    this.subs.push(this.service.deleteApplication(userId, jobId).subscribe({
      next: () => this.router.navigate([this.fromJob? 'job/' + jobId : 'user/' + userId]), 
      error: e => this.error = e.message
    }))
  }
}