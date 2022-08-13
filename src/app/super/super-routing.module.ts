import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CategoryFormComponent } from '../category/category-form/category-form.component';
import { CategoryListComponent } from '../category/category-list/category-list.component';
import { CompanyFormComponent } from '../job/company/company-form/company-form.component';
import { SectorFormComponent } from '../sector/sector-form/sector-form.component';
import { SectorListComponent } from '../sector/sector-list/sector-list.component';
import { SuperComponent } from './super.component';

const routes: Routes = [
  {path: '', component: SuperComponent},
  {path: 'category', component: CategoryListComponent},
  {path: 'category/form', component: CategoryFormComponent},
  {path: 'sector', component: SectorListComponent},
  {path: 'sector/form', component: SectorFormComponent},
  {path: 'company/form', component: CompanyFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}