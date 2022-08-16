import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { NgbModule, NgbNav, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    UserModule,
    NgbModule,
    SharedModule
  ],
  providers: [NgbNavItem, NgbNav],
  bootstrap: [AppComponent]
})
export class AppModule { }
