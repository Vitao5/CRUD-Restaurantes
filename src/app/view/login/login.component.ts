import { NavRouters } from './../../common/routesNav';
import { NotificationService } from './../../services/notification.service';
import { LoginService } from './../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  formCadastro: FormGroup
  listaUsuarios: any = []
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })
    this.formCadastro = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmSenha: ['', Validators.required],
      nomeUsuario: ['', Validators.required]
    })
    this.listarUser()
  }

 async addUser(){
    const inBody = {
      email: this.formCadastro.get('email')?.value,
      userName: this.formCadastro.get('nomeUsuario')?.value,
      password: this.formCadastro.get('senha')?.value
    } 

    if(inBody.email == '' || inBody.userName == '' || inBody.password == ''){
      this.notification.aviso('Atenção', 'Favor preencher os campos corretamente')
    }
    if(this.formCadastro.get('senha')?.value != this.formCadastro.get('confirmSenha')?.value){
      this.notification.aviso('Atenção', 'As senhas digitadas não conferem!')
    } else if(this.formCadastro.valid ){
     await this.loginService.cadastrarUsuario(inBody)
    }
 
    
  }
 async listarUser(){
   await this.loginService.buscarUsuarios().then((data)=>{
    this.listaUsuarios =  data
  
   })
  }
  async login(){
    const emailLogin = this.formLogin.get('email')?.value
    
   for (let index = 0; index < this.listaUsuarios.length; index++) {
    if( this.listaUsuarios[index].email == emailLogin){
      this.router.navigateByUrl(NavRouters.PAGE.HOME)
    }
    
      this.notification.erro('Atenção', 'Usuário não cadastrado')
   }

  }
}


