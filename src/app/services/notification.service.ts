import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toast: NgToastService) {}

  sucesso(title: string, content: string) {
    this.toast.success({
      detail: title,
      summary: content,
      duration: 4000,
    });
  }

  aviso(title: string, content: string) {
    this.toast.warning({
      detail: title,
      summary: content,
      duration: 4000,
    });
  }
  erro(title: string, content: string) {
    this.toast.error({
      detail: title,
      summary: content,
      duration: 4000,
    });
  }
}
