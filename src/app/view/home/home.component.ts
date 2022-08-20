import { RestauranteService } from './../../services/restaurante.service';
import { Component, OnInit } from '@angular/core';
import { faTrash, faPenSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  listaRestaurantes: any = [];
  nomeRestaurante: any = [];
  faTrash = faTrash;
  faPenSquare = faPenSquare;
  faPlus = faPlus
  formRestaurante: FormGroup;
  restauranteID: number = 0;
  constructor(
    private restauranteSerice: RestauranteService,
    private form: FormBuilder,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.listarRestaurantes();
    this.formRestaurante = this.form.group({
      nomeRestaurante: ['', Validators.required],
    });
  }
  async listarRestaurantes() {
    await this.restauranteSerice
      .listarRestaurantes()
      .then((res) => {
        this.listaRestaurantes = res;
      })
      .catch(() => {
        this.toast.error({
          detail: 'ERRO',
          summary: 'Algo inesperado aconteceu!',
          sticky: true,
        });
      });
  }

  async adicionarRestaurantes() {

    if (this.formRestaurante.get('nomeRestaurante')?.value == undefined) {
      this.toast.warning({
        detail: 'Aviso',
        summary: 'Favor preencha o campo para continuar',
        duration: 2000,
      });
      this.formRestaurante.get('nomeRestaurante')?.markAsTouched();
    } else {
      const inBody = {
        nome: this.formRestaurante.get('nomeRestaurante')?.value,
      };
      await this.restauranteSerice
        .addRestaurantes(inBody)
        .then(() => {
          this.toast.success({
            detail: 'Sucesso',
            summary: 'Restaurante adicionado com êxito',
            duration: 2000,
          });
          this.listarRestaurantes();
        })
        .catch(() => {
          this.toast.error({
            detail: 'ERRO',
            summary: 'Algo inesperado aconteceu!',
            sticky: true,
          });
        });
    }
    
  }
  async deletarRestaurantes(idRestaurante: number) {
    const inBody = {
      id: idRestaurante,
    };
    await this.restauranteSerice.removerRestaurantes(inBody).then(() => {
      this.listarRestaurantes();
    });
  }

  async buscaRestauranteID(id: number) {
    this.restauranteID = id;
    const inBody = {
      id: id,
    };
    await this.restauranteSerice
      .getRestauranteID(inBody)
      .then((data) => {
        this.nomeRestaurante = data;
        this.formRestaurante
          .get('nomeRestaurante')
          ?.setValue(this.nomeRestaurante.nome);
      })
      .catch();
  }
  async editarRestaurante() {
    const inBody = {
      nome: this.formRestaurante.get('nomeRestaurante')?.value,
      id: this.restauranteID,
    };
    this.restauranteSerice
      .editarRestaurante(inBody)
      .then(() => {
        this.toast.success({
          detail: 'Sucesso',
          summary: 'Nome alterado com sucesso!',
          duration: 2000,
        });
        this.listarRestaurantes();
      })
      .catch(() => {
        this.toast.error({
          detail: 'ERRO',
          summary: 'Algo inesperado aconteceu!',
          sticky: true,
        });
      });
  }
}
