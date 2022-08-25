import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(
  private notification: NotificationService,
  private http: HttpClient
) { }
  
 login(inBody: any){
  return this.http.get(`http://localhost:3000/usuarios/?email=${inBody.email}`).toPromise().then(res=>{{return res}}).catch(()=>{
    this.notification.erro('Atenção', 'Erro ao realizar operação')
  })
 }
 getUserName(name: string){
  return this.http.get(`http://localhost:3000/usuarios/?nomeUsuario=${name}`).toPromise().then(res=>{{return res}}).catch(()=>{
    this.notification.erro('Atenção', 'Erro ao realizar operação')
  })
 }
 cadastrarUsuario(inBody: any){
  
  return axios.post(`http://localhost:3000/usuarios/`, {
    nomeUsuario: inBody.nomeUsuario,
    email: inBody.email,
    senha: inBody.senha
  }).then(()=>{
    this.notification.sucesso('Sucesso', 'Cadastro realizado com sucesso')
  }).catch(()=>{
    this.notification.erro('Erro', 'Não foi possível realizar o cadastro')
  })
 }
}
