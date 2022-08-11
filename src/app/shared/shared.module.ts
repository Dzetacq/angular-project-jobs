import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ShortenContentPipe } from './shorten-content.pipe';



@NgModule({
  declarations: [
    ShortenContentPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ShortenContentPipe,
    HttpClientModule
  ]
})
export class SharedModule { }
