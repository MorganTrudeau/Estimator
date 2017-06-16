import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddClientPage } from './add-client';

@NgModule({
  declarations: [
    AddClientPage,
  ],
  imports: [
    IonicPageModule.forChild(AddClientPage),
  ],
  exports: [
    AddClientPage
  ]
})
export class AddClientPageModule {}
