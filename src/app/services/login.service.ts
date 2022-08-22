import { NotificationService } from './notification.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(
  private http: HttpClient,
  private notification: NotificationService
) { }
  
 login(idUser:number){
  return this.http.get(`${environment.baseUrl}/v2/user/${idUser}/`).toPromise().then(res=>{{return res}}).catch(()=>{
    this.notification.erro('Atenção', 'Erro ao fazer login, verifique os dados digitados')
  })
 }
 cadastrarUsuario(inBody: any){
  
  return this.http.post(`${environment.baseUrl}v2/user/`, {
    email: inBody.email,
    username: inBody.userName,
    password: inBody.password
  }).toPromise().then(()=>{
    this.notification.sucesso('Sucesso', 'Cadastro realizado com sucesso')
  }).catch((err)=>{
    this.notification.erro('Erro', err.error.username[0])
  })
 }
 buscarUsuarios(){
  return this.http.get(`${environment.baseUrl}v2/user/`).toPromise().then().catch(()=>{
  this.notification.erro('Erro', 'Não foi possível listar os usuários')
  })
 }
}
