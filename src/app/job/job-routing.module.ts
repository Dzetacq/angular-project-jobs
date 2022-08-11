import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobOverviewComponent } from './job-overview/job-overview.component';

const routes: Routes = [
  {path: 'overview', component: JobOverviewComponent},
  {path: ':id', component: JobDetailComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class JobRoutingModule { }
