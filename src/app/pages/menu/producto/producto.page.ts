import { Component, OnInit,ViewChild} from '@angular/core';
import { ProductosService} from '../../../Servicios/productos.service';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  @ViewChild(IonInfiniteScroll,{static:false}) infiniteScroll: IonInfiniteScroll;
 carritoProducto=[];
producto:any;

variable:string;
textoBuscar='';
iconoCargando = false;
  constructor( private productoServi:ProductosService,
    private modalC:ModalController,
    public alertController: AlertController,
    private router:Router) { 
     
  }

  ngOnInit() {
   this.mostrar();

  }
  mostrar(){
    this.iconoCargando=true;
    this.productoServi.mostrarProducto()
    .then(data=>{ 
      if(data['code']=="200"){
        this.producto=data['items'];
      console.log(this.producto);
      }

    }).catch((error) => console.log(error))
      .finally(() => this.iconoCargando=false);
  }
  


   buscar(evento){
    const texto=evento.target.value;
    this.textoBuscar=texto;
  }
 
  verificarExiste(item){
    var dato :any[]=[];
    dato = JSON.parse(localStorage.getItem("carrito"));
    if(dato == null){
      this.presentAlertPrompt(item);
    }else{
      if(dato.length == undefined){
        if(dato['id'] == item['id']){
          this.showAlert("Ya esta en el carrito")
        }else{
          this.presentAlertPrompt(item);
        }
      }else{
        var DatoABuscar = dato.filter(e=>e['id'] == item['id']);
        if(DatoABuscar.length ==0){
          this.presentAlertPrompt(item);
        }else{
          this.showAlert("Ya esta en el carrito")
          //aqui tiene que mostrar un alert que diga que este prodcuto ya esta en el carrito
        }
      }
    }
  }
agregarCarrito(item){

  if(JSON.parse(localStorage.getItem("carrito")) == null){
    localStorage.setItem("carrito",JSON.stringify(item));
    }else{
    var myJsonArrayObject=[];
    var carrito=[];
    carrito = JSON.parse(localStorage.getItem("carrito"));
    if(carrito.length>=2){
      carrito.map(option=>
        myJsonArrayObject.push(option)
      );
    }else{
      myJsonArrayObject.push(JSON.parse(localStorage.getItem("carrito")));
    }
    myJsonArrayObject.push(item);
    myJsonArrayObject = myJsonArrayObject.filter(e=>e!=null);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify(myJsonArrayObject));
  
}
  
}
async presentAlertPrompt(item) {
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
          var stock = 0;
          if(item.promocionesdel_producto == null){
            stock = item.stock;
          }else{
            stock = item.promocionesdel_producto.stock;
          }
          if (data.cantidad>stock) {
            this.showAlert("No hay la cantidad necesaria")
          }
          else {
            item["cantidad"]=data.cantidad;
            this.agregarCarrito(item);
            //this.showAlert("correcto")
            //console.log("correcto")
            //console.log('Confirm Ok',data);
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

cargarproducto(event){
  setTimeout(() => {
 
      if (this.producto.length ==10) {
        event.target.complete();
        this.infiniteScroll.disabled=true;
        return;
      }
    const cargando=Array(10);
    this.producto.push(...cargando);
    event.target.complete();
  }, 2000);

}

rutadelcarrito(){
  this.router.navigate(['/menu/carrito']);
}

}

