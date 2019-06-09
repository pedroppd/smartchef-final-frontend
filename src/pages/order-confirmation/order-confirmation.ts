import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../model/pedido.dto';
import { CartItem } from '../model/cart-item';
import { CartService } from '../services/models/cart.service';
import { ClienteDTO } from '../model/cliente.dto';
import { ClienteService } from '../services/models/cliente.service';
import { PedidoService } from '../services/models/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  codpedido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService, public clienteService: ClienteService, public pedidoService: PedidoService) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findByEmail(this.pedido.cliente.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
      }, error => {

      });
  }

  total() {
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
       this.codpedido = this.extractId(response.headers.get('location'));

      }, error => {
        console.log(error);
      });
  }


  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
