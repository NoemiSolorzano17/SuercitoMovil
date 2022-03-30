import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromocionPageRoutingModule } from './promocion-routing.module';

import { PromocionPage } from './promocion.page';
import {  ComponentsModule} from '../../../components/components.module';
import { ModalPromocionesPage } from '../modal-promociones/modal-promociones.page';
import { ModalPromocionesPageModule } from '../modal-promociones/modal-promociones.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  entryComponents:[
    ModalPromocionesPage
      ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromocionPageRoutingModule,
    ComponentsModule,
    ModalPromocionesPageModule,
    PipesModule
  ],
  declarations: [PromocionPage]
})
export class PromocionPageModule {}
