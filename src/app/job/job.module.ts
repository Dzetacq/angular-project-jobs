import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobComponent } from './job.component';
import { JobOverviewComponent } from './job-overview/job-overview.component';
import { JobRoutingModule } from './job-routing.module';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { SharedModule } from '../shared/shared.module';
import { JobFormComponent } from './job-form/job-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JobComponent,
    JobOverviewComponent,
    JobDetailComponent,
    JobFormComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    JobComponent,
    JobOverviewComponent
  ]
})
export class JobModule { }
