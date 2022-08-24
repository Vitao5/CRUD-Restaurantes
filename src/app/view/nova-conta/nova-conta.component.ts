import { NavRouters } from './../../common/routesNav';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html',
})
export class NovaContaComponent implements OnInit {
  formCadastro: FormGroup;
  userName: any = [];
  email: any = [];

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formCadastro = this.fb.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      confirmSenha: ['', [Validators.required]],
      nomeUsuario: ['', [Validators.required]],
    });
  }

  async verificaEmail() {
    const inBody = {
      email: this.formCadastro.get('email')?.value,
    };

    if (inBody.email != '') {
      this.loginService.login(inBody).then((data) => {
        this.email = data;
        if (this.email[0].email == inBody.email) {
          this.notification.erro(
            'Atenção',
            'Usuário já cadastrado com esse email'
          );
      
          setTimeout(() => {
            this.formCadastro.get('email')?.setValue('');
          }, 900);
        }
      });
    }
  }
  async getUserName() {
    const name = this.formCadastro.get('nomeUsuario')?.value;
    if (name != '' && name != undefined) {
      this.loginService.getUserName(name).then((data) => {
        this.userName = data;
        if (this.userName[0].nomeUsuario == name)
          this.notification.erro('Atenção', 'Nome de usuário já cadastrado');
        setTimeout(() => {
          this.formCadastro.get('nomeUsuario')?.setValue('');
        }, 900);
      });
    }
  }
  async addUser() {
    const inBody = {
      email: this.formCadastro.get('email')?.value,
      nomeUsuario: this.formCadastro.get('nomeUsuario')?.value,
      senha: this.formCadastro.get('senha')?.value,
    };

    if (inBody.email == '' || inBody.nomeUsuario == '' || inBody.senha == '') {
      this.notification.aviso('Atenção', 'Obrigatório preencher os campos');
    } else {
      if (
        this.formCadastro.get('senha')?.value !=
        this.formCadastro.get('confirmSenha')?.value
      ) {
        this.notification.aviso('Atenção', 'As senhas digitadas não conferem!');
      }
      if (
        inBody.senha.length < 5 &&
        this.formCadastro.get('confirmSenha')?.value < 5
      ) {
        this.notification.aviso('Atenção', 'Senha mínimo de 5 caracteres');
      }
      if (inBody.senha == this.formCadastro.get('confirmSenha')?.value) {
        this.loginService.cadastrarUsuario(inBody).then(() => {
          this.formCadastro.get('email')?.setValue('');
          this.formCadastro.get('nomeUsuario')?.setValue('');
          this.formCadastro.get('senha')?.setValue('');
          this.formCadastro.get('confirmSenha')?.setValue('');

          sessionStorage.setItem('Nome', inBody.nomeUsuario)

          this.notification.sucesso('Sucesso', 'Usuário cadastrado');
          setTimeout(() => {
              this.router.navigateByUrl(NavRouters.PAGE.LOGIN)
          }, 2000);
        });
      }
    }
  }
}
