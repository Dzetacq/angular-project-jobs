import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { JobFormComponent } from '../job/job-form/job-form.component';

const routes: Routes = [
  { path: 'job/:id', component: JobFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}