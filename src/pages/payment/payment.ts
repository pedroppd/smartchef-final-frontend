import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../model/pedido.dto';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.pedido = this.navParams.get('pedido');

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required],
      numeroMesa: ['', Validators.required]
    });
  }

  pedido: PedidoDTO;

  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10];
  numeroMesa: number[] = [1,2,3,4,5,6,7,8,9,10];

  formGroup: FormGroup;

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    this.pedido.numeroDaMesas = this.formGroup.controls.numeroMesa['_pendingValue'];
    console.log(this.pedido);
  }

}
