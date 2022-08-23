import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

constructor(
  private http: HttpClient
) { }

  listarRestaurantes(){
    return this.http.get(`${environment.baseUrl}v2/restaurantes/`).toPromise().then(res =>{{return res}})
  }

  addRestaurantes(data: any){
    return  this.http.post(`${environment.baseUrl}v2/restaurantes/`, {nome: data.nome},).toPromise().then(res =>{{return res}})
  }

  removerRestaurantes(param: any){
    return  this.http.delete(`${environment.baseUrl}v2/restaurantes/${param.id}/`,).toPromise().then(res =>{{return res}}).catch(() =>{
      alert('Erro ao remover ')
    } )
  }

  getRestauranteID(param: any){
    return  this.http.get(`${environment.baseUrl}v2/restaurantes/${param.id}/`,).toPromise().then(res =>{{return res}}).catch(() =>{
    } )
  }

  editarRestaurante(param: any){
    
    return  this.http.put(`${environment.baseUrl}v2/restaurantes/${param.id}/`, {nome: param.nome}).toPromise().then(res =>{{return res}})
  }

}
