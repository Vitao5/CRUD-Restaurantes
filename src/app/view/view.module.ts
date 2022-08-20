import { ComponentsModule } from './../components/components.module';
import { IconsModule } from './../common/icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
    
  ],
  declarations:[
    HomeComponent
  ],
  exports:[
    HomeComponent
  ]
})
export class ViewModule { }
