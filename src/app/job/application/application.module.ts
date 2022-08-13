import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ApplicationComponent,
    ApplicationListComponent,
    ApplicationDetailComponent,
    ApplicationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ApplicationComponent,
    ApplicationListComponent
  ]
})
export class ApplicationModule { }
