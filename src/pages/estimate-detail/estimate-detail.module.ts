import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstimateDetailPage } from './estimate-detail';

@NgModule({
  declarations: [
    EstimateDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EstimateDetailPage),
  ],
  exports: [
    EstimateDetailPage
  ]
})
export class EstimateDetailPageModule {}
