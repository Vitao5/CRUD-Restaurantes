import { NavRouters } from './../../common/routesNav';
import { NotificationService } from './../../services/notification.service';
import { LoginService } from './../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  listaUsuarios: any = [];
  user: any = [];
  email: any = [];

  disableButton: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', Validators.required ,Validators.pattern(Utils.getEmailPattern())],
      senha: ['', [Validators.required]],
    });
  
  }


  async login() {
    const inBody = {
      email: this.formLogin.get('email')?.value,
      senha: this.formLogin.get('senha')?.value,
    };

    if (inBody.email != '' && inBody.senha != '') {
      await this.loginService.login(inBody).then((data) => {
        this.user = data;
        if (this.user[0] == undefined) {
          this.notificationService.erro('Erro', 'Usuário não cadastrado!');
        }
        if (this.user[0].senha != inBody.senha) {
          this.notificationService.erro('Atenção', 'Senha incorreta');
        }
        if (
          this.user[0].email == inBody.email &&
          this.user[0].senha == inBody.senha
        ) {
          setTimeout(() => {
            this.router.navigateByUrl(NavRouters.PAGE.HOME);
          }, 500);
        }
      });
    } else {
      this.formLogin.markAllAsTouched()
      this.notificationService.aviso('Atenção', 'Obrigatório preencher os campos');
    }
  }


}
