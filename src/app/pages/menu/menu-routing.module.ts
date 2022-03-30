import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MenuPage } from './menu.page';

const routes: Routes = [
  {
        path: '',
        component: MenuPage,
      children: [
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule)
      },{
        path: 'ubicacion',
        loadChildren: () => import('./ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
      }, {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
      },{
        path: 'carrito',
        loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
      },{
        path: 'vista-producto',
        loadChildren: () => import('./vista-producto/vista-producto.module').then( m => m.VistaProductoPageModule)
      },{
        path: 'promocion',
        loadChildren: () => import('./promocion/promocion.module').then( m => m.PromocionPageModule)
      }

      
      ]

  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
