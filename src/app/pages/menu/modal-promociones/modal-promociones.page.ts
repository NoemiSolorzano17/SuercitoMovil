import { Component, OnInit,Input } from '@angular/core';
import { ModalController,NavParams  } from '@ionic/angular';
import{PromocionesService} from '../../../Servicios/promociones.service'

@Component({
  selector: 'app-modal-promociones',
  templateUrl: './modal-promociones.page.html',
  styleUrls: ['./modal-promociones.page.scss'],
})
export class ModalPromocionesPage implements OnInit {
  registro:any;
  constructor(
    private modalC:ModalController,
    private registroServi:PromocionesService,
    private navParams: NavParams
    ) { }
    listaPromociones:any[]=[];
  ngOnInit() {
    
    this.mostrar(this.navParams.data['promociones']['id'])
  }
  

  async closeModal(){
    await this.modalC.dismiss();
  }
  mostrar(id){
    this.registroServi.mostrarPromocionesproducto(id)
    .then(data=>{ 
      if(data['code']=="200"){
        this.registro=data['items'];
        console.log(this.registro);
      }

    });
  }

}
