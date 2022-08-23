import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'invalid-feedback',
  templateUrl: './invalid-feedback.component.html',
  styles: [
  ]
})
export class InvalidFeedbackComponent {

  @Input() field:any;
  @Input() name:any;
  msgError: string = '';

  constructor(private renderer: Renderer2, hostElement: ElementRef) {
    renderer.addClass(hostElement.nativeElement, 'invalid-feedback')
  }

  isError(field:any) {
    this.msgError = ''
    

    if (field.errors?.required) {
      this.msgError = 'Campo obrigatório.'
    } else if (field.errors?.invalidDate) {
      this.msgError = 'Data inválida.'
    } else if (field.errors?.pattern) {
      this.msgError = `${this.name || 'Campo'} inválido.`
    } else if (field.errors?.invalid) {
      this.msgError = `${this.name || 'Campo'} inválido.`
    } else if (field.errors?.['Mask error'] || field.errors?.mask) {
      this.msgError = `${this.name || 'Campo'} inválido.`
    }
    return this.msgError;
  }
}
