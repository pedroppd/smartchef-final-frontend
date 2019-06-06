import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../model/cart-item';
import { StorageService } from '../services/storage.service';
import { ProdutoService } from '../services/models/produto.service';
import { API_CONFIG } from '../config/api.config';
import { CartService } from '../services/models/cart.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public produtoService: ProdutoService, public cartService: CartService) {
  }

  items: CartItem[];

  ionViewDidLoad() {
   let cart = this.cartService.getCart();
   this.items = cart.items;
   this.loadImageUrl();

  }


  loadImageUrl(){
    for(var i = 0; i<this.items.length; i++){
        let item = this.items[i];
        this.produtoService.getImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prodd${item.produto.id}.jpg`;
        }, 
        error => {});
    }
  }
}
