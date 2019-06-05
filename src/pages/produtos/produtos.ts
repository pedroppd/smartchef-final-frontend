import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../model/produto.dto';
import { ProdutoService } from '../services/models/produto.service';



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

      }, error => {

      });

  }

}
