import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../services/models/produto.service';
import { ProdutoDTO } from '../model/produto.dto';
import { API_CONFIG } from '../config/api.config';
import { CartService } from '../services/models/cart.service';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public cartService: CartService) {
  }

  item: any;

  ionViewDidLoad() {


    let id = this.navParams.get('id_produto');

    this.produtoService.findProdutoById(id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
        error => { });
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prodd${this.item.id}.jpg`;
      },
        error => { });
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduct(produto);
    this.navCtrl.setRoot('CartPage');
  }


}


