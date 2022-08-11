import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './super-routing.module';
import { SuperComponent } from './super.component';
import { CompanyModule } from '../company/company.module';
import { CategoryModule } from '../category/category.module';
import { SectorModule } from '../sector/sector.module';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    SuperComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule, 
    CompanyModule,
    CategoryModule,
    SectorModule,
    UserModule
  ]
})
export class SuperModule { }
