
import { NavRouters } from './../../common/routesNav';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as EmailValidator from 'email-validator';
@Component({
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html',
})
export class NovaContaComponent implements OnInit {
  formCadastro: FormGroup;
  userName: any = [];
  email: any = [];
  testeEmail: boolean = false

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formCadastro = this.fb.group({
      email:['', Validators.required],
      senha: ['', Validators.required],
      confirmSenha: ['',Validators.required],
      nomeUsuario: ['', Validators.required],
    });

  }

  async verificaEmail() {
    
    const inBody = {
      email: this.formCadastro.get('email')?.value,
    };
    const emailValidator =  EmailValidator.validate(inBody.email);
  
    
      if(!emailValidator){
        this.testeEmail = true
      }
      else {
        this.testeEmail = false
        this.loginService.login(inBody).then((data) => {
          this.email = data;
          if (this.email[0]?.email == inBody.email) {
            this.notificationService.erro(
              'Atenção',
              'Usuário já cadastrado com esse email'
            );
            setTimeout(() => {
              this.formCadastro.get('email')?.setValue('');
            }, 900);
          }
          this.formCadastro.get('email')?.markAsUntouched()
        });
      }
    
  }
  async getUserName() {
    
    const name = this.formCadastro.get('nomeUsuario')?.value;
    
      if (name != '' && name != undefined) {
        this.loginService.getUserName(name).then((data) => {
          this.userName = data;
          if (this.userName[0]?.nomeUsuario == name){
            this.notificationService.erro(
              'Atenção', 
              'Nome de usuário já cadastrado'
              );
            this.formCadastro.get('nomeUsuario')?.markAsTouched()
          setTimeout(() => {
            this.formCadastro.get('nomeUsuario')?.setValue('');
          }, 900);
          }
        });
      }   
   
  }
  async addUser() {
    
    const inBody = {
      email: this.formCadastro.get('email')?.value,
      nomeUsuario: this.formCadastro.get('nomeUsuario')?.value,
      senha: this.formCadastro.get('senha')?.value,
      confirmeSenha: this.formCadastro.get('confirmSenha')?.value
    };
   
    
    if (inBody.email == '' || inBody.nomeUsuario == '' || inBody.senha == '') {
      this.notificationService.aviso('Atenção', 'Obrigatório preencher os campos');
      this.formCadastro.markAllAsTouched()
    } else {
      if (
        inBody.senha != inBody.confirmeSenha
      ) {
        this.notificationService.aviso('Atenção', 'As senhas digitadas não conferem!');
      }
      if (
        inBody.senha.length < 5 &&
        inBody.confirmeSenha < 5
      ) {
        this.notificationService.aviso('Atenção', 'Senha mínimo de 5 caracteres');
      }
      if(this.testeEmail){
        this.notificationService.erro(
          'Erro',
          'Email no formato inválido'
          )
       }
      if (inBody.senha == inBody.confirmeSenha) {
        if(
           inBody.email.trim().length === 0 ||
           inBody.nomeUsuario.trim().length === 0 ||
           inBody.senha.trim().length === 0 || 
           inBody.confirmeSenha.trim().length === 0
           )
           {
            this.notificationService.aviso(
              'Aviso',
              'Não é permetido espaços em branco'
            )
           }
           
           else{
             this.loginService.cadastrarUsuario(inBody).then(() => {
               this.formCadastro.get('email')?.setValue('');
               this.formCadastro.get('nomeUsuario')?.setValue('');
               this.formCadastro.get('senha')?.setValue('');
               this.formCadastro.get('confirmSenha')?.setValue('');
                          
            this.notificationService.sucesso('Sucesso', 'Usuário cadastrado');
            setTimeout(() => {
              this.router.navigateByUrl(NavRouters.PAGE.LOGIN)
            }, 2000);
          });
        }

      }
    }
  }
}
