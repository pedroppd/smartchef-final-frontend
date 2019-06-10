import { Component } from '@angular/core';
import { NavController, LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,  public load: LoadingController) {

  }

  goToCategorias(){
    let loader = this.presentLoading();
    this.navCtrl.push('CategoriasPage');
    loader.dismiss();
  }


  presentLoading() {
    let load = this.load.create({
      content: "Carregando..."
    });
    load.present();
    return load;
  }

}
