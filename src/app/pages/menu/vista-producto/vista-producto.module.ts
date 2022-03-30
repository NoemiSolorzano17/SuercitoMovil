import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { VistaProductoPageRoutingModule } from './vista-producto-routing.module';

import { VistaProductoPage } from './vista-producto.page';
import { ComponentsModule } from 'src/app/components/components.module';


const routes: Routes = [


];
@NgModule({
  entryComponents:[

      ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    VistaProductoPageRoutingModule,
    ComponentsModule,
 

   
  ],
  exports: [RouterModule],
  declarations: [VistaProductoPage]
})
export class VistaProductoPageModule {}
