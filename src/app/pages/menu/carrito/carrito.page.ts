import { Component, OnInit } from '@angular/core';
import { ProductosService} from '../../../Servicios/productos.service';
import{PromocionesService} from '../../../Servicios/promociones.service'
import{CarritoService} from '../../../Servicios/carrito.service'
import { AlertController } from '@ionic/angular'
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carritoProducto:any[]=[];
  carritoPromociones:any[]=[];
  productoid:any;
  constructor( private productoServi:ProductosService,
    private promocionServi:PromocionesService,
    private compraServi:CarritoService,
    public alertController: AlertController
    ) { 
   
  }

  ngOnInit() {
    this.setDatos();
    this.setDatos1();
  }
  eliminar(carri){
    let itemIndexProducto  = this.carritoProducto.findIndex(item => item.id == carri.id);
    this.carritoProducto.splice(itemIndexProducto, 1);
    //this.carritoProducto = this.carritoProducto.filter(option => option['id']!= carri);
    localStorage.setItem("carrito",JSON.stringify(this.carritoProducto))
    this.setDatos();


  }
  
 
  setDatos(){
    this.carritoProducto=[];
    var lista:any[]=[];
    lista=JSON.parse(localStorage.getItem("carrito"));
    if(lista.length >0){
      lista.map(e=>{
        if(e['cantidad'] != null){
          this.productoServi.mostrarProductoId(e['id'])
            .then(data=>{ 
              if(data['code']=="200"){
                data['items']['cantidad'] = e['cantidad'];
                if(data['items']['promocionesdel_producto'] == null)
                {
                  if(e['cantidad'] > data['items']['stock']){
                    data['items']['PermitirVender'] = false;
                    this.carritoProducto.push(data['items']);
                  }else{
                    data['items']['PermitirVender'] = true;
                    this.carritoProducto.push(data['items']);
                  }
                }else{
                  if(e['cantidad'] > data['items']['promocionesdel_producto']['stock']){
                    data['items']['PermitirVender'] = false;
                    this.carritoProducto.push(data['items']);
                  }else{
                    data['items']['PermitirVender'] = true;
                    this.carritoProducto.push(data['items']);
                  }
                }
              }
            })
        }
        
      });
    }
console.log(this.carritoProducto);
  }
  lista:any[]=[];
  setDatos1(){
    this.carritoPromociones=[];
    var listaPromociones:any[]=[];
    listaPromociones=JSON.parse(localStorage.getItem("carritoPromociones"));
    if(listaPromociones.length > 0){
      listaPromociones.map(e=>{
        if(e['cantidad'] != null){
          this.promocionServi.mostrarRegistroId(e['id'])
            .then(data=>{ 
              if(data['code']=="200"){
                data['items']['PrecioPromocionConDescuento'] = e['PrecioPromocionConDescuento'];
                data['items']['PrecioSinDescuento'] = e['PrecioSinDescuento'];
                data['items']['ValorDescontado'] = e['ValorDescontado'];
                //data['items']['cantidad'] = e['cantidad'];
                data['items']['Carritocantidad'] = e['cantidad'];
                if(e['cantidad'] >data['items']['cantidad']){
                  data['items']['PermitirVender'] = false;
                  this.carritoPromociones.push(data['items']);
                }else{
                  data['items']['PermitirVender'] = true;
                  this.carritoPromociones.push(data['items']);
                }
              }
            })
        }
        
      });
               
    }
    console.log( this.carritoPromociones);
  }
  eliminarPromocion(carripro){
    this.carritoPromociones= this.carritoPromociones.filter(option => option['id']!=carripro);
    localStorage.setItem("carritoPromociones",JSON.stringify(this.carritoPromociones))
    this.setDatos1();
  }
  //funcion para modificar cantidad

  async modificarCantidad(carri) {
   
    const alert = await this.alertController.create({
      mode:"ios" ,
      header: 'Ingrese la Cantidad a comprar',
      inputs: [
        {
          name:'cantidad',
          type: 'number',
          value:carri.cantidad,
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
           if(carri.promocionesdel_producto == null){
             if(data.cantidad<=carri.stock){
              let itemIndexProducto = this.carritoProducto.findIndex(item => item.id == carri.id);
              this.carritoProducto[itemIndexProducto ]['cantidad']=data.cantidad;
              localStorage.setItem("carrito",JSON.stringify(this.carritoProducto));
              this.showAlert(" Ingreso de cantidad existosa");
             }else{
              this.showAlert("No hay la cantidad necesaria");
             }

           }else{
            if(data.cantidad<=carri.promocionesdel_producto.stock){
              let itemIndexProducto  = this.carritoProducto.findIndex(item => item.id == carri.id);
              this.carritoProducto[itemIndexProducto ]['cantidad']=data.cantidad;
              localStorage.setItem("carrito",JSON.stringify(this.carritoProducto));
              this.showAlert(" Ingreso de cantidad existosa");
             }else{
              this.showAlert("No hay la cantidad necesaria");
             }
           }
         }
        }
      ]
    
    });
    await alert.present();
   }

   async modificarCantidadKit(carripro) {
 
    const alert = await this.alertController.create({
      mode:"ios" ,
      header: 'Ingrese la Cantidad a comprar',
      inputs: [
        {
          name:'cantidad',
          type: 'number',
          value:carripro.Carritocantidad,
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
             if(data.cantidad<=carripro.cantidad){
              let itemIndex = this.carritoPromociones.findIndex(item => item.id == carripro.id);
              this.carritoPromociones[itemIndex]['Carritocantidad'] = data.cantidad;
              localStorage.setItem("carritoPromociones",JSON.stringify(this.carritoPromociones))
              this.showAlert("Ingreso de cantidad existosa");
             }else{
              this.showAlert("No hay la cantidad necesaria");
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
    
  registroCompra(){
    this.compraServi.guardarCompra(JSON.stringify(this.carritoPromociones),localStorage.getItem("nomeToken"))
      .then((ok) => {
        console.log(ok);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
}
