import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewModule } from './view/view.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViewModule,
    AppRoutingModule,
    HttpClientModule,
    NgToastModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
