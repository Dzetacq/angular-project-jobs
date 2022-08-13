import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobComponent } from './job.component';
import { JobOverviewComponent } from './job-overview/job-overview.component';
import { JobRoutingModule } from './job-routing.module';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { SharedModule } from '../shared/shared.module';
import { JobFormComponent } from './job-form/job-form.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CompanyComponent } from './company/company.component';
import { CompanyOverviewComponent } from './company/company-overview/company-overview.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { ApplicationModule } from './application/application.module';
import { ApplicationComponent } from './application/application.component';
import { ApplicationListComponent } from './application/application-list/application-list.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';



@NgModule({
  declarations: [
    JobComponent,
    JobOverviewComponent,
    JobDetailComponent,
    JobFormComponent,
    CompanyComponent,
    CompanyDetailComponent,
    CompanyOverviewComponent,
    CompanyFormComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    ApplicationModule
  ],
  exports: [
    JobComponent,
    JobOverviewComponent,
    CompanyComponent,
    CompanyOverviewComponent,
    ApplicationComponent,
    ApplicationListComponent
  ]
})
export class JobModule { }
