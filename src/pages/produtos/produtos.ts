import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../model/produto.dto';
import { ProdutoService } from '../services/models/produto.service';
import { API_CONFIG } from '../config/api.config';



@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public load: LoadingController) {
  }

  items: ProdutoDTO[];


  loadData() {
    let categoria_id = this.navParams.get('id_categoria');
    let loader = this.presentLoading();
    this.produtoService.findBycategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrl();

      }, error => {
        loader.dismiss();
      });
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadImageUrl() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prodd${item.id}.jpg`;
        },
          error => { });
    }
  }


  showDetail(id_produto: string) {
    this.navCtrl.push('DetailsPage', { id_produto: id_produto });
  }

  presentLoading() {
    let load = this.load.create({
      content: "Carregando..."
    });
    load.present();
    return load;
  }

  doRefresh(refresher) {
    //this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }


}
