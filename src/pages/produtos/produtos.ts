import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../model/produto.dto';
import { ProdutoService } from '../services/models/produto.service';
import { API_CONFIG } from '../config/api.config';



@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  items: ProdutoDTO[];

 


  ionViewDidLoad() {
    let categoria_id = this.navParams.get('id_categoria');

    this.produtoService.findBycategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrl();

      }, error => {

      });

  }


  loadImageUrl(){
    for(var i = 0; i<this.items.length; i++){
        let item = this.items[i];
        this.produtoService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prodd${item.id}.jpg`;
        }, 
        error => {});
    }
  }

}
