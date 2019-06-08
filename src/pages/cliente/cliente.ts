import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../services/models/cidade.service';
import { EstadoService } from '../services/models/estado.service';
import { ClienteService } from '../services/models/cliente.service';
import { CidadeDTO } from '../model/cidade.dto';
import { EstadoDTO } from '../model/estado.dto';
import { PedidoDTO } from '../model/pedido.dto';
import { CartService } from '../services/models/cart.service';


@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public cidadeService: CidadeService, public estadoService: EstadoService, public clienteService: ClienteService, public cartService: CartService) {
    this.formGroup = this.formBuilder.group({
      nome: ['Pedro Dantas', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['lucienispdantas@gmail.com', [Validators.required, Validators.email]],
      cpf: ['11343729628', [Validators.required, Validators.minLength(11)]],
      numero: ['288', []],
      complemento: ['casa 1', []],
      bairro: ['barro vermelho', []],
      cep: ['24416060', [Validators.required]],
      telefone1: ['988728190', [Validators.required]],
      telefone2: ['975111058', [Validators.required]],
      telefone3: ['926287244', [Validators.required]],
      cidadeId: [null, [Validators.required]],
      estadoId: [null, [Validators.required]]

    });
  }
  formGroup: FormGroup
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  item: any;
  pedido: PedidoDTO;

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

  findByEmail(){

  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
      
       let cart = this.cartService.getCart();
       let email = this.formGroup.controls.email;
       this.pedido = {
         cliente: {email: email['_pendingValue']},
         endereco: null,
         pagamento: null,
         numeroDaMesas: null,
         items: cart.items.map(x => {return {quantidade: x.quantidade, produto: {id:x.produto.id}}})     
       }
      this.navCtrl.push('PaymentPage', {pedido: this.pedido});
      },
        error => { });
  }


}
