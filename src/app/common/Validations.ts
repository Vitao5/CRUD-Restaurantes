import { AbstractControl } from '@angular/forms';

export class Validations {
  static OnlyLetters(control: AbstractControl) {
    const regex = /^[a-z ']+$/i;
    const space = new RegExp('[ ]{2,}');
    let current: string = '';
    if (control.value) current = control.value.substr(control.value.length - 1);

    if (current && space.test(control.value)) {
      control.setValue(control.value.slice(0, control.value.length - 1));
    }

    if (current && !regex.test(current)) {
      const newValue = control.value.replace(current, '');
      control.setValue(newValue);
      return;
    }

    return null;
  }
}
