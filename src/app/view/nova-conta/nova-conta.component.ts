import { NavRouters } from './../../common/routesNav';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DadosUser } from 'src/app/common/users.interface';
@Component({
    selector: 'app-nova-conta',
    templateUrl: './nova-conta.component.html',
})
export class NovaContaComponent implements OnInit {
    formCadastro: FormGroup;
    userName: Array<DadosUser>;
    email: Array<DadosUser>;
    testeEmail: boolean = false;
    object: any  = {}
    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.formCadastro = this.fb.group({
            email: ['', Validators.required],
            senha: ['', Validators.required],
            confirmSenha: ['', Validators.required],
            nomeUsuario: ['', Validators.required],
        });
    }

    objectForm(){
      this.object = {
        email: this.formCadastro.get('email')?.value,
        nomeUsuario: this.formCadastro.get('nomeUsuario')?.value,
        senha: this.formCadastro.get('senha')?.value,
        confirmeSenha: this.formCadastro.get('confirmSenha')?.value
    };
    return this.object;
    }

    async verificaEmail() {

        const regexMail = /\S+@\S+\.\S+/;
        const emailValidator = regexMail.test(this.objectForm().email);

        !emailValidator ? this.testeEmail = true : this.testeEmail = false;
        this.loginService.login(this.objectForm()).then((data: any) => {
            this.email = data;
            if (this.email[0]?.email == this.objectForm().email) {
                this.notificationService.erro(
                    'Atenção',
                    'Usuário já cadastrado com esse email'
                );
                setTimeout(() => {
                    this.formCadastro.get('email')?.setValue('');
                }, 900);
            }
            this.formCadastro.get('email')?.markAsUntouched();
        });
    }
    async getUserName() {

        if (this.objectForm().nomeUsuario != '') {
            this.loginService.getUserName(this.objectForm().nomeUsuario).then((data: any) => {
                this.userName = data;
                if (this.userName[0]?.nomeUsuario == this.objectForm().nomeUsuario) {
                    this.notificationService.erro(
                        'Atenção',
                        'Nome de usuário já cadastrado'
                    );
                    this.formCadastro.get('nomeUsuario')?.markAsTouched();
                    setTimeout(() => {
                        this.formCadastro.get('nomeUsuario')?.setValue('');
                    }, 900);
                }
            });
        }
    }

    verificaEspacos(){
      if (
        this.objectForm().email.trim().length == 0 ||
        this.objectForm().nomeUsuario.trim().length == 0 ||
        this.objectForm().senha.trim().length == 0 ||
        this.objectForm().confirmeSenha.trim().length == 0
    ) {
        return true
      }
      return false
    }

    verificaSenha(){
      if(this.objectForm().senha == this.objectForm().confirmeSenha){
          if(this.objectForm().senha.trim().length != 0 && this.objectForm().confirmeSenha.trim().length != 0){
            if(this.objectForm().senha.trim().length > 4  && this.objectForm().confirmeSenha.trim().length > 4){
              return true
            }
            else{
              this.notificationService.aviso('Atenção', 'Senha mínimo de 5 caracteres')
              return false
            }
          }
          
          else{
            return false
          }
      } 
      else{
        this.notificationService.aviso('Atenção','As senhas digitadas não conferem!')
        return false
      }    
      
     
    }

    async addUser() {
      
        if (this.testeEmail) {
            this.notificationService.erro('Erro', 'Email no formato inválido');
        } else {
            if (this.objectForm().email == '' || this.objectForm().nomeUsuario == '' || this.objectForm().senha == '') {
                this.notificationService.aviso('Atenção','Obrigatório preencher os campos');
                this.formCadastro.markAllAsTouched();
            } else {
                if (this.verificaSenha()) {
                  this.verificaEspacos() ? this.notificationService.aviso('Aviso','Não é permitido espaços em branco') : this.loginService.cadastrarUsuario(this.objectForm()).then(() => {
                    this.notificationService.sucesso(
                        'Sucesso',
                        'Usuário cadastrado'
                    );
                    setTimeout(() => {
                        this.router.navigateByUrl(
                            NavRouters.PAGE.LOGIN
                        );
                    }, 1500);
                });
                }
            }
        }
    }
}
