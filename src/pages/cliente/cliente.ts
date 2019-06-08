import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../services/models/cidade.service';
import { EstadoService } from '../services/models/estado.service';
import { ClienteService } from '../services/models/cliente.service';
import { CidadeDTO } from '../model/cidade.dto';
import { EstadoDTO } from '../model/estado.dto';


@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public cidadeService: CidadeService, public estadoService: EstadoService, public clienteService: ClienteService) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      numero: ['', []],
      complemento: ['', []],
      bairro: ['', []],
      cep: ['', [Validators.required]],
      telefone1: ['', [Validators.required]],
      telefone2: ['', [Validators.required]],
      telefone3: ['', [Validators.required]],
      cidadeId: [null, [Validators.required]],
      estadoId: [null, [Validators.required]]

    });
  }
  formGroup: FormGroup
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
        error => { });
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
        error => { });
  }

  signupUser() {
    
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        //maybe you can change here for passed for another page
      },
        error => { });
        
      
  }

  
}
