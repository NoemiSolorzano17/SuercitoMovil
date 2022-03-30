import { Component, OnInit } from '@angular/core';
import{PromocionesService} from '../../../Servicios/promociones.service'
import { ModalController,NavParams  } from '@ionic/angular';
import {ModalPromocionesPage } from '../modal-promociones/modal-promociones.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.page.html',
  styleUrls: ['./promocion.page.scss'],
})
export class PromocionPage implements OnInit {
  promociones:any = [];

  textoPromocion='';
   items: any = [];
 
  constructor(private promocionServi:PromocionesService,private modalC:ModalController,
    public alertController: AlertController,
    private router:Router) { 
   
    }

  ngOnInit() {
    this.mostrar();
   
  }
  mostrar(){
    this.promocionServi.mostrarPromociones()
    .then(data=>{ 
      if(data['code']=="200"){
        this. promociones=data['items'];
      console.log(this.promociones);
      }

    });
  }
 
  async abrirModal(element?){
    const modal = await this.modalC.create({
    component: ModalPromocionesPage,
    componentProps: {
      "promociones":element
    }
   });
 
   return await modal.present();
 

  }
  buscar(evento){
    const texto=evento.target.value;
    this. textoPromocion=texto;
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.promociones.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  verificarExistePromociones(item){
    var datoPromociones :any[]=[];
    datoPromociones = JSON.parse(localStorage.getItem("carritoPromociones"));

    if(datoPromociones == null){
      this.presentAlertPromocion(item);
    }else{
      if(datoPromociones.length == undefined){
        if(datoPromociones['id'] == item['id']){
          this.showAlert("Ya esta en el carrito")
        }else{
          this.presentAlertPromocion(item);
        }
      }else{
        var DatoABuscarPromociones = datoPromociones.filter(e=>e['id'] == item['id']);
        if(DatoABuscarPromociones.length ==0){
          this.presentAlertPromocion(item);
        }else{
          this.showAlert("Ya esta en el carrito")
          //aqui tiene que mostrar un alert que diga que este prodcuto ya esta en el carrito
        }
      }
    }
  }
  agregarCarritoPromociones(item){
    if(JSON.parse(localStorage.getItem("carritoPromociones")) == null){
      localStorage.setItem("carritoPromociones",JSON.stringify(item));
    }else{
      var myJsonPromociones=[];
      var carritoPromociones=[];
      carritoPromociones = JSON.parse(localStorage.getItem("carritoPromociones"));
      if(carritoPromociones.length>=2){
        carritoPromociones.map(option=>
          myJsonPromociones.push(option)
        );
      }else{
        myJsonPromociones.push(JSON.parse(localStorage.getItem("carritoPromociones")));
      }
      myJsonPromociones.push(item);
      localStorage.removeItem("carritoPromociones");
      localStorage.setItem("carritoPromociones",JSON.stringify(myJsonPromociones));
    }
  }
  async presentAlertPromocion(item) {
    const alert = await this.alertController.create({
      mode:"ios" ,
      header: 'Cantidad a comprar',
      inputs: [
        {
          name:'cantidad',
          type: 'number',
          placeholder: 'cantidad'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
        {
          text: 'ok',
          handler: (data) => {
            if(data.cantidad<= item.cantidad){
              item["cantidad"]=data.cantidad;
              this.agregarCarritoPromociones(item);
            }else {
              this.showAlert("No hay la cantidad necesaria")
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async showAlert (Mensaje) {
    const alert = await this.alertController.create({
      message: Mensaje,
      buttons: ['ok']
    });
    await alert.present();
  };
  rutadelcarrito(){
    this.router.navigate(['/menu/carrito']);
  }

}
