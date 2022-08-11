import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyOverviewComponent } from './company/company-overview/company-overview.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './user/auth/auth.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'job', loadChildren: () => import('./job/job.module').then(m => m.JobModule)}, 
  { path: 'login', component: AuthComponent},
  { path: 'register', component: AuthComponent},
  { path: 'logout', component: AuthComponent},
  { path: 'account', component: UserComponent},
  { path: 'account/edit', component: AuthComponent},
  { path: 'company', component: CompanyOverviewComponent},
  { path: 'company/:id', component: CompanyDetailComponent},
  { path: 'super', loadChildren: () => import('./super/super.module').then(m => m.SuperModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
