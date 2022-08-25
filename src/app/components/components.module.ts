import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
  
  ],
  exports:[
    NavbarComponent
  ]
})
export class ComponentsModule { }
