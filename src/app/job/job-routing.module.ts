import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ApplicationDetailComponent } from './application/application-detail/application-detail.component';
import { ApplicationFormComponent } from './application/application-form/application-form.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobOverviewComponent } from './job-overview/job-overview.component';

const routes: Routes = [
  {path: 'overview', component: JobOverviewComponent},
  {path: ':id', component: JobDetailComponent},
  {path: 'application/:userId/:jobId/:fromJob', component: ApplicationDetailComponent},
  {path: 'application/form', component: ApplicationFormComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class JobRoutingModule { }
