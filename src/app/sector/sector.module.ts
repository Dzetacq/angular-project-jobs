import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorComponent } from './sector.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SectorComponent,
    SectorListComponent,
    SectorFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SectorListComponent
  ]
})
export class SectorModule { }
