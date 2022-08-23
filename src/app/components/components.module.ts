import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidFeedbackComponent } from './invalid-feedback/invalid-feedback.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    InvalidFeedbackComponent,
  
  ],
  exports:[
    NavbarComponent,
    InvalidFeedbackComponent
  ]
})
export class ComponentsModule { }
