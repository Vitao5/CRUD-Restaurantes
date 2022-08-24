import { RouterModule } from '@angular/router';
import { NovaContaComponent } from './nova-conta/nova-conta.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from './../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    
  ],
  declarations:[
    HomeComponent,
    LoginComponent,
    NovaContaComponent
  ],
  exports:[
    HomeComponent,
    LoginComponent,
    NovaContaComponent
  ]
})
export class ViewModule { }
