import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { RouterModule } from '@angular/router';
import { JobModule } from '../job/job.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDetailComponent,
    CompanyOverviewComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    JobModule,
    FormsModule
  ],
  exports: [
    CompanyComponent,
    CompanyOverviewComponent
  ]
})
export class CompanyModule { }
