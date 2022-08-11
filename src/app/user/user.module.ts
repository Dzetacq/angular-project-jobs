import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { CompanyModule } from '../company/company.module';
import { RouterModule } from '@angular/router';



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
    CompanyModule
  ],
  exports: [
    UserComponent,
    UserListComponent
  ]
})
export class UserModule { }
