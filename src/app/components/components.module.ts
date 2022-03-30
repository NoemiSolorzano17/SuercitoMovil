import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { PromocionesComComponent } from './promociones-com/promociones-com.component';




@NgModule({
  declarations: [

    HeaderComponent,
    PromocionesComComponent
   
 

  ],
  exports:[
    HeaderComponent,
    PromocionesComComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
   RouterModule 
  ]
})
export class ComponentsModule { }
