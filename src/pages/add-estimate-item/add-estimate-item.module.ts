import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEstimateItemPage } from './add-estimate-item';

@NgModule({
  declarations: [
    AddEstimateItemPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEstimateItemPage),
  ],
  exports: [
    AddEstimateItemPage
  ]
})
export class AddEstimateItemPageModule {}
