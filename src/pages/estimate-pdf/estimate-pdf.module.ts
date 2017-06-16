import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstimatePdfPage } from './estimate-pdf';

@NgModule({
  declarations: [
    EstimatePdfPage,
  ],
  imports: [
    IonicPageModule.forChild(EstimatePdfPage),
  ],
  exports: [
    EstimatePdfPage
  ]
})
export class EstimatePdfPageModule {}
