import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { JobModule } from '../job/job.module';



@NgModule({
  declarations: [
    UserComponent,
    AuthComponent,
    UserListComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    JobModule
  ],
  exports: [
    UserComponent,
    UserListComponent
  ]
})
export class UserModule { }
