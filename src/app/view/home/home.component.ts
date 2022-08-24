import { RestauranteService } from './../../services/restaurante.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  listaRestaurantes: any = [];
  nomeRestaurante: any = [];
  formRestaurante: FormGroup;
  restauranteID: number = 0;

  constructor(
    private restauranteSerice: RestauranteService,
    private form: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.listarRestaurantes();
    this.formRestaurante = this.form.group({
      nomeRestaurante: ['', Validators.required],
      novoNomeRestaurante: ['', Validators.required],
    });
  }
  async listarRestaurantes() {
    await this.restauranteSerice
      .listarRestaurantes()
      .then((res) => {
        this.listaRestaurantes = res;
      })
      .catch(() => {
        this.notificationService.erro(
          'Erro',
          'Não foi possível listar os restaurantes'
        );
      });
  }

  async adicionarRestaurantes() {
    if (
      this.formRestaurante.get('nomeRestaurante')?.value == (undefined || '')
    ) {
      this.notificationService.aviso(
        'Aviso',
        'Favor preencha o campo para continuar'
      );
      this.formRestaurante.markAllAsTouched()
    } else {
      const inBody = {
        nome: this.formRestaurante.get('nomeRestaurante')?.value,
      };
      await this.restauranteSerice
        .addRestaurantes(inBody)
        .then(() => {
          this.formRestaurante.get('nomeRestaurante')?.setValue('');
          this.notificationService.sucesso(
            'Sucesso',
            'Restaurante adicionado com êxito'
          );
          this.listarRestaurantes();
        })
        .catch(() => {
          this.notificationService.erro(
            'Erro',
            'Não foi possível adicionar o restaurante'
          );
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
          .get('novoNomeRestaurante')
          ?.setValue(this.nomeRestaurante.nome);
      })
      .catch();
  }
  async editarRestaurante() {
    const inBody = {
      nome: this.formRestaurante.get('novoNomeRestaurante')?.value,
      id: this.restauranteID,
    };
    if(inBody.nome == ''){
      this.notificationService.aviso(
        'Aviso',
        'Favor preencha o campo para continuar'
      );
    }
    else{
      this.restauranteSerice
      .editarRestaurante(inBody)
      .then(() => {
        this.notificationService.sucesso(
          'Sucesso',
          'Nome alterado com sucesso!'
        );
        this.listarRestaurantes();
      })
      .catch(() => {
        this.notificationService.erro(
          'Erro',
          'Não foi possível alterar os dados'
        );
      });
    }
  }
}
