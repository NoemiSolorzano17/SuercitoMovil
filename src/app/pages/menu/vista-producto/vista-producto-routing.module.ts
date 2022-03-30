import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaProductoPage } from './vista-producto.page';
const routes: Routes = [
  {
    path: '',
   redirectTo:'product',
  },

  {
    path: '',
    component: VistaProductoPage,
   children:[
    {
      path: 'product',
      loadChildren: () => import('../producto/producto.module').then( m => m.ProductoPageModule)
    },
    {
      path: 'promociones',
      loadChildren: () => import('../promocion/promocion.module').then( m => m.PromocionPageModule)
    }
   ]
   
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaProductoPageRoutingModule {}
